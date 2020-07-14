import { Helpers } from './helpers.mjs'

export class Line {
    constructor(start, end) {
        this._start = start;
        this._end = end;
        this.init();
    }

    init() {
        this._length = this.calculateLength();
        this._points = this.generatePoints();
        this._slope = this.getSlope();
    }

    generatePoints() {
        return {
            [this._start.toString()]: this._start,
            [this._end.toString()]: this._end
        }
    }

    calculateLength() {
        return Helpers.pointDistance(this._start, this._end);
    }

    getSlope() {
        let a = this._start;
        let b = this._end;
        return (b.y - a.y) / ((b.x - a.x) * 1.0)
    }

    toString() {
        // 2_1-3_2
        return `${this._start.toString()}-${this._end.toString()}`
    }

    get points() {
        return this._points
    }

    get length() {
        return this._length
    }

    get slope() {
        return this._slope
    }


    set start(start) {
        this._start = start
        this._length = this.calculateLength()
    }

    set end(end) {
        this._end = end
        this._length = this.calculateLength()
    }

    get start() {
        return this._start
    }

    get end() {
        return this._end
    }

}