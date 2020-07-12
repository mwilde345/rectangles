export class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    getLength() {
        //this returns the square of the distance
        // sqr((x2 - x1)^2 + (y2 - y1)^2)
        let a = this.start;
        let b = this.end;
        return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)
    }

    getAngle() {
        let a = this.start;
        let b = this.end;
        //arctangent (stackoverflow)
        var dy = a.y - b.y;
        var dx = a.x - b.x;
        var theta = Math.atan2(dy, dx);
        theta *= 180 / Math.PI;
        return theta;
        // 0,0 and -1, 1 is 135
        // 0,0 and 1,-1 is -45
    }

    set start(start) {
        this.start = start
    }

    set end(end) {
        this.end = end
    }

    get start() {
        return this.start
    }

    get end() {
        return this.end
    }

}