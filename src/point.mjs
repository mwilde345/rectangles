export class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    toString() {
        return `${this._x}_${this._y}`
    }

    equals(p1) {
        return this._x === p1.x && this._y === p1.y
    }

    get x() {
        return this._x
    }

    get y() {
        return this._y
    }

    set x(x) {
        this._x = x;
    }

    set x(y) {
        this._y = y;
    }
}