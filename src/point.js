export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `${this.x}_${this.y}`
    }

    equals(p1) {
        return this.x === p1.x && this.y === p1.y
    }

    get x() {
        return this.x
    }

    get y() {
        return this.y
    }

    set x(x) {
        this.x = x;
    }

    set x(y) {
        this.y = y;
    }
}