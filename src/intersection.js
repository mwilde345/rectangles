export class Intersection {
    constructor(points) {
        this.points = points
    }
    get points() {
        return this.points;
    }

    addPoint(point) {
        this.points.push(point)
        return this.points
    }
}