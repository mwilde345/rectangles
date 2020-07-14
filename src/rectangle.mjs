import { Line } from './line.mjs';
import { Helpers } from './helpers.mjs'
export class Rectangle {
    // a collection of lines
    constructor(p1, p2, p3, p4) {
        this._p1 = p1;
        this._p2 = p2;
        this._p3 = p3;
        this._p4 = p4;
        // {points: {start: p, end: p}, length: n}
        this._diagonal = null
        // length of short + long side
        this._halfPerimeter = null
        // area of rectangle
        this._area = null
        // map of point names to point objects
        this._points = null
        // map of line names to line objects
        this._lines = null
        // [slope1, slope2]. slopes of short and long lines
        this._slopes = null
        // boolean 
        this._isRectangle = null
        this.init();
    }

    init() {
        // set isRectangle and set this.diagonal
        this.checkRectangle();
        // set this.points
        this.generatePoints();
        if (this._isRectangle) {
            // set this.lines
            this.generateLines();
            // set this.halfPerimeter and this.area and this.slopes
            this.calculateHalfPerimeterAndAreaAndSlopes();
        }
    }

    get diagonal() {
        return this._diagonal;
    }

    get halfPerimeter() {
        return this._halfPerimeter;
    }

    get area() {
        return this._area;
    }

    get lines() {
        return this._lines;
    }

    get points() {
        return this._points;
    }

    get isRectangle() {
        return this._isRectangle;
    }

    get slopes() {
        return this._slopes;
    }

    generatePoints() {
        this._points = {
            [this._p1.toString()]: this._p1,
            [this._p2.toString()]: this._p2,
            [this._p3.toString()]: this._p3,
            [this._p4.toString()]: this._p4
        }
    }

    generateLines() {
        // return {'2_1-3_2': <Line>, ...}
        // line between 2,1 and 3,2
        let points = [this._p1, this._p2, this._p3, this._p4];
        let maxLength = this._diagonal.length;
        // create lines between points that are not of length diagonal
        let lines = {}
        for (let i = 0; i < points.length - 1; i++) {
            for (let j = i + 1; j < points.length; j++) {
                if (Helpers.pointDistance(points[i], points[j]) < maxLength) {
                    let line = new Line(points[i], points[j]);
                    lines[line.toString()] = line;
                }
            }
        }
        this._lines = lines;
    }

    calculateHalfPerimeterAndAreaAndSlopes() {
        let [line1, line2] = this.getUniqueLines();
        this._halfPerimeter = line1.length + line2.length;
        this._area = line1.length * line2.length;
        this._slopes = [line1.slope, line2.slope];
    }

    getUniqueLines() {
        // returns the two lines of different lengths
        let lines = Object.values(this._lines);
        let line1 = lines[0];
        let line2 = lines.filter(l => {
            return l.length != line1.length
        })[0] || line1; // if a square
        return [line1, line2]
    }
    toString() {
        return Object.keys(this._points).join('-')
    }

    checkRectangle() {
        let result = true;
        let points = [this._p1, this._p2, this._p3, this._p4];
        let [p1, p2, p3, p4] = points;
        // if we knew all input were rectangles, then only need 3 points
        if (!p1 || !p2 || !p3 || !p4) {
            result = false;
        }
        // make sure all points are unique
        if (new Set([p1.toString(), p2.toString(), p3.toString(), p4.toString()]).size !== 4) {
            result = false;
        }
        let lineLengths = [];
        // any two points that form a diagonal (use for containment)
        let maxPoints = [p1, p2]
        // get the diagonal length first
        // technically we only need to scan three points to get the diagonal
        for (let i = 0; i < points.length - 1; i++) {
            for (let j = i + 1; j < points.length; j++) {
                let newLength = Helpers.pointDistance(points[i], points[j])
                lineLengths.push(newLength);
                if (newLength >= Math.max(...lineLengths)) {
                    maxPoints = [points[i], points[j]]
                }
            }
        }
        // get distance for each line. no more than 3 unique (1 diag, 2 sides)
        if (new Set(lineLengths).size > 3) {
            result = false;
        }
        this._diagonal = {
            length: Math.max(...lineLengths),
            points: maxPoints
        }
        this._isRectangle = result;
    }
}