import { Point } from './point.mjs';

export class Helpers {
    isParallel(l1, l2) {
        // get slope for both lines and check equality
        return l1.slope === l2.slope;
    }

    static pointDistance(p1, p2) {
        //this returns the square of the distance
        if (!p1 || !p2) {
            return null;
        }
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y))
    }

    static isPointOnLine(p1, l1) {
        // p2p1 + p1p3 must equal p2p3
        let [p2, p3] = Object.values(l1.points);
        return this.pointDistance(p1, p2) + this.pointDistance(p1, p3) == this.pointDistance(p2,p3)
    }

    static getIntersectionPoint(l1, l2) {
        // y = mx + b. set m1x + b1 = m2x + b2 to solve x intersection
        // plug x intersection into either function to get y intersection
        let xinter, yinter, y1int, y2int
        if (l1.slope === Number.POSITIVE_INFINITY) {
            xinter = l1.start.x;
        }
        else if (l2.slope === Number.POSITIVE_INFINITY) {
            xinter = l2.start.x;
        }
        if (l1.slope === 0) {
            yinter = l1.start.y;
        } else if (l2.slope === 0) {
            yinter = l2.start.y;
        }
        if (!xinter) {
            y1int = l1.start.y - l1.slope * l1.start.x * 1.0
            y2int = l2.start.y - l2.slope * l2.start.x * 1.0
            xinter = (y2int - y1int) / (l1.slope - l2.slope)
        }
        if (!yinter) {
            yinter = (l1.slope * xinter) + y1int;
        }
        let intersection = new Point(xinter, yinter);
        let isOnLine1 = this.isPointOnLine(intersection, l1);
        let isOnLine2 = this.isPointOnLine(intersection, l2);
        let linePoints = [...Object.keys(l1.points), ...Object.keys(l2.points)]
        // if the intersection is not on one of the lines, return null;
        // bonus: to count an intersection as a point of a rectangle coming at a diff angle onto a point in a line
        // but not in an adjacent way, get the slopeSet of both lines' rectangles and add that check
        return (!isOnLine1 || !isOnLine2 || linePoints.includes(intersection.toString())) ? null : intersection
    }
}    
