export class Rectangle {
    // a collection of lines
    constructor(l1, l2, l3, l4) {
        this.l1 = l1;
        this.l2 = l2;
        this.l3 = l3;
        this.l4 = l4;
    }

    getLines() {
        return [l1, l2, l3, l4];
    }

    getArea() {

    }

    isRectangle() {
        // make sure all the points are unique
        // you can either make sure diagonals have same distance
        // or use the lines 
        // get distance for each line. no more than 3 unique (1 diag, 2 sides)
    }
}