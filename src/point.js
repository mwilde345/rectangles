export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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