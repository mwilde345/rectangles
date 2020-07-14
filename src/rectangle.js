import { Line } from './line';
const Helpers = require('helpers');
export class Rectangle {
    // a collection of lines
    constructor(p1, p2, p3, p4) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.init();
    }

    init() {
        // set this.points
        this.generatePoints();
        // set this.lines and this.diagonal
        this.generateLines();
        // set this.halfPerimeter and this.area
        this.calculateHalfPerimeterAndArea();
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
        let maxLength = 0;
        // any two points that form a diagonal (use for containment)
        let maxPoints = {'start': points[0], 'end': points[1]}
        // get the diagonal length first
        // technically we only need to scan three points to get the diagonal
        for (i = 0; i < points.length - 1; i++) {
            for (j = i + 1; j < points.length; j++) {
                let newLength = Helpers.pointDistance(points[i], points[j])
                if (newLength >= maxLength) {
                    maxLength = newLength;
                    maxPoints = {'start': points[i], 'end': points[j]}
                }
            }
        }
        this.diagonal = {
            length: maxLength,
            points: maxPoints
        }
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

    calculateHalfPerimeterAndArea() {
        let [line1, line2] = this.getUniqueLines();
        this.halfPerimeter = line1.length + line2.length;
        this.area = line1.length * line2.length;
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

    isRectangle() {
        if (!l1 || !l2 || !l3 || !l4) {
            return false;
        }

        // make sure all the points are unique
        // you can either make sure diagonals have same distance
        // or use the lines 
        // get distance for each line. no more than 3 unique (1 diag, 2 sides)
    }
}