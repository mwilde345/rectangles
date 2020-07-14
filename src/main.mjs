import { Point } from './point.mjs'
import { Line } from './line.mjs'
import { Rectangle } from './rectangle.mjs'
import { Helpers } from './helpers.mjs'
import { Relationship } from './relationship.mjs'
import { Result } from './result.mjs'
import { Adjacency } from './adjacency.mjs'
import { Containment } from './containment.mjs'
import { Intersection } from './intersection.mjs'

class Main {
    constructor(input) {
        this._result = new Result();
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
                return;
            }
            let rect = new Rectangle(
                new Point(line[0][0], line[0][1]),
                new Point(line[1][0], line[1][1]),
                new Point(line[2][0], line[2][1]),
                new Point(line[3][0], line[3][1])
            )
            let isRectangle = rect.isRectangle;
            if (!isRectangle) {
                console.log(`line ${index} contains an invalid rectangle. Skipping`);
                metadata[rect.toString()] = {
                    isRectangle
                }
                return;
            } else metadata[rect.toString()] = rect;
        })
        let rectArray = Object.values(metadata);
        if (rectArray.length < 2) {
            console.log(`Only ${rectArray.length} valid rectangle(s) exist. Not enough to compare!`)
        }
        // compare each rectangle against every other
        for (let i = 0; i < rectArray.length - 1; i++) {
            let r1 = rectArray[i];
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
                this._result.addRelationship(r1.toString(),r2.toString(),relationship);
            }
        }
        console.log(JSON.stringify(this._result));
        return this._result;
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
                if (r1.toString()==='0_0-1_0-0_3-1_3' && r2.toString() === '0_0-0.5_0-0_2-0.5_2') {
                    console.log(r1line, r2line)
                }
                let intersectionPoint = Helpers.getIntersectionPoint(r1line, r2line);
                if (intersectionPoint) {
                    intersectingPoints.push(intersectionPoint)
                }
            })
        })
        return intersectingPoints.length ? new Intersection(intersectingPoints) : null;

    }
    // O(8) only check one daig in r1 against all points in r2 and vice versa
    checkContains(r1, r2) {
        // can be adjacent and contained
        // can't be intersecting and contained
        // For every point 'p' on r2, ensure that ap + pc < ab + bc where a,b,c are top left, right, bottom right of r1
        //  and vice versa
        let containment = true;
        let parent = r1.toString();
        let child = r2.toString();
        let [diagonal1, halfPerimeter1, diagonal2, halfPerimeter2] = 
            [r1.diagonal, r1.halfPerimeter, r2.diagonal, r2.halfPerimeter];
        let [a1, c1, a2, c2] = [...diagonal1.points, ...diagonal2.points];
        let pointsFor1 = Object.values(r2.points);
        let pointsFor2 = Object.values(r1.points);
        let r1ContainsR2 = pointsFor1.filter(p => {
            return Helpers.pointDistance(a1, p) + Helpers.pointDistance(p, c1) <= halfPerimeter1
        }).length === 4
        let r2ContainsR1 = pointsFor2.filter(p => {
            return Helpers.pointDistance(a2, p) + Helpers.pointDistance(p, c2) <= halfPerimeter2
        }).length === 4
        if (!r1ContainsR2 && !r2ContainsR1){
            containment = false;
        }
        if (r2ContainsR1) {
            parent = r2.toString();
            child = r1.toString();
        }
        return new Containment(containment, parent, child)
    }

    // sub: A sub-line share is a share where one side of rectangle A is a line that 
    //      exists as a set of points wholly contained on some other side of rectangle B
    // partial: where some line segment on a side of rectangle A exists as a set of points on some side of Rectangle B
    // proper: 2 lines are the same

    // store types of adjacency found
    // options: proper/sub/sub, sub/sub, proper, sub, partial
    //O(n*2) 4x2 lines. compare each line with its parallel counterparts
    checkAdjacent(r1, r2) {
        let adjacency = new Adjacency();
        let r1lines = Object.values(r1.lines); // [l1,l2,l3,l4]
        let r2lines = Object.values(r2.lines);
        let relatedR2Lines = [];
        for (let i = 0; i < r1lines.length; i++){
            let line1 = r1lines[i];
            inner_loop:
            for (let j = 0; j < r2lines.length; j++) {
                // don't worry about a line that's already been related
                if (relatedR2Lines.includes(j)) continue;
                let line2 = r2lines[j];
                // don't worry about lines that aren't parallel
                if (line1.slope !== line2.slope) continue;
                // if the lines share points, they are proper
                let uniquePoints = new Set([...Object.keys(line1.points), ...Object.keys(line2.points)])
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
        return adjacency;
    }
}
new Main([
    [[0,0],[1,0],[0,3],[1,3]],
    [[0,0],[0.5,0],[0,2],[0.5,2]],
    [[0,0],[0.5,0],[0,4],[0.5,4]],
]);