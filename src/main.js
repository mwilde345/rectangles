import {Point} from './point'
import {Line} from './line'
import {Rectangle} from './rectangle'
import {Helpers} from './helpers'
import {Relationship} from './relationship'
import {Result} from './result'
import {Adjacency} from './adjacency'
import {Containment} from './containment'
import {Intersection} from './intersection'

class Main {
    constructor(input) {
        this.analyze(input)
    }
    analyze(input) {

    }
    // first check they are rectangles
    // sub: A sub-line share is a share where one side of rectangle A is a line that 
    //      exists as a set of points wholly contained on some other side of rectangle B
    // partial: where some line segment on a side of rectangle A exists as a set of points on some side of Rectangle B
    // proper: 2 lines are the same
    checkAdjacent(r1, r2) {
        // rule out parallel
        let r1lines = r1.lines; // [l1,l2,l3,l4]
        let r2lines = r2.lines;
        r1lines.forEach(line1 => {
            r2lines.forEach(line2 => {
                // same points? proper line. store it to relationship. need to stop r1 iteration and exclude r2 line from future iterations
                // else check for parallel
                // if parallel: is on line. AC + CB = AB
                // is D on line AD + DB = AB
                    // if yes then sub
                    // else partial
                // TODO: function to get AC and CB
            })
        })

        // otherwise, it could be proper or sub adjacent
        // if they share 2 points and are parallel then that line is proper.
        // if they share more than 2 points, they are same rectangle
        // so get 1 slope from r1, compare with at most 3 slopes from r2 and rule out if not parallel
        // no point in comparing points on lines without same slope

        //within function comparing lines between r1 and r2, if same slope, nested function to find points on theline
        // is c online? AC + CB = AB
        // is proper? we know from above already.
        // 
        
        // store which lines are parallel to each other.
        // {135: {r1: [l1, l3], r2: [l2, l4]}, 90: {r1: [l2, l4], r2: [l1, l3]}}
        // go through parallel pairs and check if the lines are adjacent
            // if the lines have a same point, it could be proper or sub 
                // if one line is longer than the other, it's not proper, it's sub
                // else proper
            // otherwise it could be sub or partial
                // check if C is on line A->B: return dist(A,C) + dist (C,B) === dist (A,B) 
                // if C is on AB, it's sub if D ends before B (forget length) so if CB > CD 
                // if C is on AB, it's partial if D extends beyond B (forget length) so if CB < CD 
        // TODO: determine if we should compare D to A or B.... draw it out
        // store the actual adjacent line segment, not the rectangle line segments
    }

    checkIntersection(r1, r2) {
        // can be intersecting and adjacent
        // no more than 8 intersecting points
        // one line can intersect no more than 2 times with another line
        //  after finding 2 intersections for a line, stop with that line - intersectionCache

    }

    checkContains(r1, r2) {
        // can be adjacent and contained
        // can't be intersecting and contained
    }

    
}
new Main(input);