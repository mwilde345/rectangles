import { Point } from './point'
import { Line } from './line'
import { Rectangle } from './rectangle'
import { Helpers } from './helpers'
import { Relationship } from './relationship'
import { Result } from './result'
import { Adjacency } from './adjacency'
import { Containment } from './containment'
import { Intersection } from './intersection'

class Main {
    constructor(input) {
        this.result = new Result();
        this.analyze(input)
    }
    // O(N^2)
    analyze(input) {
        // first pass collects data about each rectangle
        let metadata = {}
        // if the input is a set of points, init each rectangle with 4 points
        input.forEach((line, index) => {
            if (line.length < 4) {
                console.log(`line ${index} must have 4 points. Skipping`);
                continue;
            }
            let rect = new Rectangle(
                new Point(line[0][0], line[0][1]),
                new Point(line[1][0], line[1][1]),
                new Point(line[2][0], line[2][1]),
                new Point(line[3][0], line[3][1])
            )
            let { isRectangle, diagonal, halfPerimeter, area, points, lines, slopes } = rect;
            if (!isRectangle) {
                console.log(`line ${index} contains an invalid rectangle. Skipping`);
                metadata[rect.toString] = {
                    isRectangle
                }
                continue;
            } else metadata[rect.toString()] = rect;
        })
        let rectArray = Object.values(metadata);
        // compare each rectangle against every other
        for (let i = 0; i < rectArray.length - 1; i++) {
            let r1 = rectArray[i];
            if (!r1.isRectangle) {
                console.log()
            }
            for (let j = i + 1; j < rectArray.length; j++) {
                let r2 = rectArray[j];
                if (r1.toString() === r2.toString()) {
                    console.log(`Found two identical rectangles at: ${r1.toString()}. Skipping.`);
                    continue;
                }
                let relationship = new Relationship();

                // start checking relationships
                relationship.intersection = this.checkIntersection(r1, r2);
                if (!relationship.intersection) {
                    // r1 can't contain r2 if r2 intersects with r1 (crosses any line)
                    relationship.containment = this.checkContains(r1, r2);
                }
                // rule out parallel
                let [slopes1, slopes2] = [r1.slopes, r2.slopes];
                // if one line in r1 is not parallel with another line in r2, no adjacency can exist
                if (slopes2.includes(slopes1[0])) {
                    relationship.adjacency = this.checkAdjacent(r1, r2)
                }
                this.result[r1.toString()][r2.toString()] = relationship;
            }
        }
        return this.result;
    }
    // O(16) 4x4 lines
    // what are the intersecting points between the two rectangles?
    checkIntersection(r1, r2) {
        // bonus: intersectionMemo. Which lines of which rectangles have discovered intersections
        //  if a line has 2 intersections, exclude it from further checks

        // can be intersecting and adjacent
        // one line can intersect no more than 2 times with another line
        let r1lines = Object.values(r1.lines);
        let r2lines = Object.values(r2.lines);
        let intersectingPoints = []
        r1lines.forEach(r1line => {
            r2lines.forEach(r2line => {
                let intersectionPoint = Helpers.getIntersectionPoint(r1line, r2line);
                if (intersectionPoint) {
                    intersectingPoints.push(intersectionPoint)
                }
            })
        })
        return intersectingPoints.length ? new Intersection(intersectingPoints) : null;

    }
    // O(4) only check one daig in r1 against all points in r2
    // true if r1 contains r2 (false if rectangles are passed in opposite order)
    checkContains(r1, r2) {
        // can be adjacent and contained
        // can't be intersecting and contained
        // For every point 'p' on r2, ensure that ap + pc < ab + bc where a,b,c are top left, right, bottom right of r1
        let { diagonal, halfPerimeter } = r1;
        let [a, c] = diagonal.points;
        let points = Object.values(r2.points);
        return new Containment(
            points.filter(p => {
                Helpers.pointDistance(a, p) + Helpers.pointDistance(p, c) <= halfPerimeter
            })
                .length === 4
        )
    }

    // sub: A sub-line share is a share where one side of rectangle A is a line that 
    //      exists as a set of points wholly contained on some other side of rectangle B
    // partial: where some line segment on a side of rectangle A exists as a set of points on some side of Rectangle B
    // proper: 2 lines are the same

    // store types of adjacency found
    // options: proper/sub/sub, sub/sub, proper, sub, partial
    // [{type: SUB, line: <Line>}]
    //O(16) 4x4 lines.
    checkAdjacent(r1, r2) {
        let adjacency = new Adjacency();
        let r1lines = Object.values(r1.lines); // [l1,l2,l3,l4]
        let r2lines = Object.values(r2.lines);
        let relatedR2Lines = [];
        for (i = 0; i < r1lines.length; i++){
            let line1 = r1lines[i];
            inner_loop:
            for (j = 0; j < r2lines.length; j++) {
                // don't worry about a line that's already been related
                if (relatedR2Lines.includes(j)) continue;
                let line2 = r2lines[j];
                // don't worry about lines that aren't parallel
                if (line1.slope !== line2.slope) continue;
                // if the lines share points, they are proper
                let uniquePoints = new Set(...Object.keys(line1.points), ...Object.keys(line2.points))
                if (uniquePoints.size === 2) {
                    // add proper line
                    adjacency.addProper(line1)
                    relatedR2Lines.push(j);
                    break inner_loop
                }
                let [a,b] = Object.values(line1.points);
                let [c,d] = Object.values(line2.points);
                let isAonLine = Helpers.isPointOnLine(a, line2);
                let isBonLine = Helpers.isPointOnLine(b, line2);
                // check the other way around
                let isConLine = Helpers.isPointOnLine(c, line1);
                let isDonLine = Helpers.isPointOnLine(d, line1);
                // check if one of the points are on the other line
                if (isAonLine || isBonLine || isConLine || isDonLine) {
                    if (isConLine && isDonLine){
                        // cd is a sub line of ab
                        adjacency.addSub(line2);
                        relatedR2Lines.push(j)
                        break inner_loop
                    } 
                    if (isAonLine && isBonLine) {
                        // ab is a sub line of cd
                        adjacency.addSub(line1)
                        relatedR2Lines.push(j)
                        break inner_loop
                    }
                    // at this point we know it's not proper, and it's not sub, and at least one of the points are on 
                    //  the other line, so it must be partial. need to find which line is partial. for a partial case,
                    //  A or B will be for sure present on CD. Must choose which point of CD is also present on AB
                    if (isAonLine) {
                        let dORc = isDonLine ? d : c;
                        adjacency.addPartial(new Line(dORc, a));
                        relatedR2Lines.push(j);
                        break inner_loop
                    } else if (isBonLine) {
                        let dORc = isDonLine ? d : c;
                        adjacency.addPartial(newLine(dORc, b))
                        relatedR2Lines.push(j);
                        break inner_loop
                    }
                } else {
                    // no line is on another, so these lines do not touch. next line
                    continue;
                }
            }
        }
    }
}
new Main(input);