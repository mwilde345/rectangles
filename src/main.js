class Main {
    // first check they are rectangles
    // sub: A sub-line share is a share where one side of rectangle A is a line that 
    //      exists as a set of points wholly contained on some other side of rectangle B
    // partial: where some line segment on a side of rectangle A exists as a set of points on some side of Rectangle B
    // proper: 2 lines are the same
    checkAdjacent(r1, r2) {
        // first check if any two points between the rectangles are the same
        // if all 4 points are, then they're the same rectangles
        // otherwise, it could be proper or sub adjacent

        // isParallel helper for each pair of lines between rectangles.
        // if after 3 checks no parallel, then no adjacency
        // store which lines are parallel to each other.
        // {135: {r1: [l1, l3], r2: [l2, l4]}, 90: {r1: [l2, l4], r2: [l1, l3]}}
        // go through parallel pairs and check if the lines are adjacent
            // if the lines have a same point, it could be proper or sub 
                // if one line is longer than the other, it's not proper, it's sub
                // else proper
            // otherwise it could be sub or partial
                // check if C is on line A->B: return dist(A,C) + dist (C,B) === dist (A,B) 
                // if C is on AB, it's sub if D ends before B (forget length) so if CB > CD 
                // if C is on AB, it's partial if D extends beyond B (forget length) so if CB < CD 
        // TODO: determine if we should compare D to A or B.... draw it out
        // store the actual adjacent line segment, not the rectangle line segments
    }

    checkContains(r1, r2) {

    }

    checkIntersection(r1, r2) {

    }

    
}