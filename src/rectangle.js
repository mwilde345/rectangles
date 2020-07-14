import { Line } from './line';
const Helpers = require('helpers');
export class Rectangle {
    // a collection of lines
    constructor(p1, p2, p3, p4) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        // {points: {start: p, end: p}, length: n}
        this.diagonal = null
        // length of short + long side
        this.halfPerimeter = null
        // area of rectangle
        this.area = null
        // map of point names to point objects
        this.points = null
        // map of line names to line objects
        this.lines = null
        // [slope1, slope2]. slopes of short and long lines
        this.slopes = null
        // boolean 
        this.isRectangle = null
        this.init();
    }

    init() {
        // set isRectangle and set this.diagonal
        this.checkRectangle();
        if (this.isRectangle) {
            // set this.points
            this.generatePoints();
            // set this.lines
            this.generateLines();
            // set this.halfPerimeter and this.area and this.slopes
            this.calculateHalfPerimeterAndAreaAndSlopes();
        }
    }

    get diagonal() {
        return this.diagonal;
    }

    get halfPerimeter() {
        return this.halfPerimeter;
    }

    get area() {
        return this.area;
    }

    get lines() {
        return this.lines;
    }

    get points() {
        return this.points;
    }

    generatePoints() {
        this.points = {
            [this.p1.toString()]: this.p1,
            [this.p2.toString()]: this.p2,
            [this.p3.toString()]: this.p3,
            [this.p4.toString()]: this.p4
        }
    }

    generateLines() {
        // return {'2_1-3_2': <Line>, ...}
        // line between 2,1 and 3,2
        let points = [this.p1, this.p2, this.p3, this.p4];
        let maxLength = this.diagonal.length;
        // create lines between points that are not of length diagonal
        let lines = {}
        for (i = 0; i < points.length - 1; i++) {
            for (j = i + 1; j < points.length; j++) {
                if (Helpers.pointDistance(points[i], points[j]) < maxLength) {
                    let line = new Line(points[i], points[j]);
                    lines[line.toString()] = line;
                }
            }
        }
        this.lines = lines;
    }

    calculateHalfPerimeterAndAreaAndSlopes() {
        let [line1, line2] = this.getUniqueLines();
        this.halfPerimeter = line1.length + line2.length;
        this.area = line1.length * line2.length;
        this.slopes = [line1.slope, line2.slope];
    }

    getUniqueLines() {
        // returns the two lines of different lengths
        let lines = Object.values(this.lines);
        let line1 = lines[0];
        let line2 = this.getLines().filter(l => {
            l.length != line1.length
        })[0] || line1; // if a square
        return [line1, line2]
    }

    checkRectangle() {
        let result = true;
        // if we knew all input were rectangles, then only need 3 points
        if (!p1 || !p2 || !p3 || !p4) {
            result = false;
        }
        // make sure all points are unique
        if (new Set([p1.toString(), p2.toString(), p3.toString(), p4.toString()]).size !== 4) {
            result = false;
        }
        let points = [this.p1, this.p2, this.p3, this.p4];
        let lineLengths = [];
        // any two points that form a diagonal (use for containment)
        let maxPoints = { 'start': points[0], 'end': points[1] }
        // get the diagonal length first
        // technically we only need to scan three points to get the diagonal
        for (i = 0; i < points.length - 1; i++) {
            for (j = i + 1; j < points.length; j++) {
                let newLength = Helpers.pointDistance(points[i], points[j])
                lineLengths.push(newLength);
                if (newLength >= Math.max(...lineLengths)) {
                    maxPoints = { 'start': points[i], 'end': points[j] }
                }
            }
        }
        // get distance for each line. no more than 3 unique (1 diag, 2 sides)
        if (new Set(lineLengths).size > 3) {
            result = false;
        }
        this.diagonal = {
            length: Math.max(...lineLengths),
            points: maxPoints
        }
        this.isRectangle = result;
    }
}