const Helpers = require('helpers');

export class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.init();
    }

    init() {
        this.length = this.calculateLength();
        this.points = this.generatePoints();
        this.slope = this.getSlope();
    }

    generatePoints() {
        return {
            [this.start.toString()]: this.start,
            [this.end.toString()]: this.end
        }
    }

    calculateLength() {
        return Helpers.pointDistance(this.start, this.end);
    }

    getSlope() {
        let a = this.start;
        let b = this.end;
        return (b.y - a.y) / (b.x - a.x) * 1.0
    }

    toString() {
        // 2_1-3_2
        return `${this.start.toString()}-${this.end.toString()}`
    }

    get points() {
        return this.points
    }

    get length() {
        return this.length
    }
    

    set start(start) {
        this.start = start
        this.length = this.calculateLength()
    }

    set end(end) {
        this.end = end
        this.length = this.calculateLength()
    }

    get start() {
        return this.start
    }

    get end() {
        return this.end
    }

}