import { Point } from './point';

export class Helpers {
    isParallel(l1, l2) {
        // get slope for both lines and check equality
        return l1.slope === l2.slope;
    }

    pointDistance(p1, p2) {
        //this returns the square of the distance
        if (!p1 || !p2) {
            return null;
        }
        return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
    }

    isPointOnLine(p1, l1) {
        // p2p1 + p1p3 must equal p2p3
        let [p2, p3] = Object.values(l1.points);
        return this.pointDistance(p1, p2) + this.pointDistance(p1, p3) == this.pointDistance(p2,p3)
    }

    getIntersection(l1, l2) {
        // y = mx + b. set m1x + b1 = m2x + b2 to solve x intersection
        // plug x intersection into either function to get y intersection
        let y1int = l1.start.y - l1.slope * l1.start.x * 1.0
        let y2int = l2.start.y - l2.slope * l2.start.x * 1.0
        let xinter = (y2int - y1int) / (l1.slope - l2.slope)
        let yinter = (l1.slope * xinter) + y1int;
        return new Point(xinter, yinter);
    }
}    
