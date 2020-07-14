export class Intersection {
    constructor(points) {
        this._points = points
    }
    get points() {
        return this._points;
    }

    addPoint(point) {
        this._points.push(point)
        return this._points
    }
}