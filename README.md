# rectangles

https://nuvalence-development-exercises.s3.amazonaws.com/rectangles/Rectangles+Programming+Sample.pdf

## Input
* picture
  * Only need outermost pixels of a rectangle, single line of 1s
  * adjacent lines of 1s could be a rectangle with no center... a line
  * skyscraper with multiple stores taking up a whole level. Can't layer rectangles. Some sort of notation?
  * so each rectangle would have a z-axis parameter and you would only compare rectangles on the same z-axis.
  * space for new building or structure? pass it into the program yo.
    * provide data for selling costs of real estate based off how well a structure will fit into a spot. Search real-estate based on desired dimensions or sell it based of available dimensions. sell an alleyway lul
* list of rectangle objects
* csv with each line being a rectangle
* each file has results in its own graph
* inputs that would require scale and cloud resources?
  * listen to file changes and update respective graph
  * listen to new file uploads and add to same graph if they relate (sqs)
* host graph database and provide access to upload and query data via website
  
  

## Requirements
* Rectangle object needs only 3 points as parameters
* only in the positive quadrant
* each algorithm should only compare 2 rectangles and return Result object
* should analyze line by line, AND point by point. 
  * lines for intersecting between points
  * points for containment and adjacency


## Intersection - return intersecting points
* max of 8 intersection points. more than that it's the same rectangle
* only happens if 2 lines meet at differing angles. Otherwise it's adjacent.
  * unless you have rectangle in another rectangle. Inner rectangle is sub adjacent on one edge, other edge goes outside of outer rectangle. Adjacent and intersecting.
  * so those two points are marked as being part of an adjacent line, so they can't be marked as intersecting. But those points can be used to determine the connection to the remaining points to determine intersection. becuase otherwise that edge would give an infinite number of intersection points.

## Adjacency - return true and type of adjacency
* not next to each other, but sharing a line. One line's points are a subset of another line's points and they have the same angle
* rule out adjacency between objects of different angles

## Containment - return true or false
* rule out relationship of bigger to smaller object, but smaller to bigger is possible
* rectangle can be containment and also adjacent.
  * rectangle can be adjacent on a max of 3 sides otherwise it is same rectangle

## GetSlope
* Determine slope between 2 points.

## Point object

## Line object

## Edge Object

## Node object
* each node is a rectangle

## Result object
* Return array of edge (relationship) objects
* If any line is adjacent, then there should be a duplicate edge but in the other direction. rec1->rec2 and rec2->rec1 same adjacency
* same with intersection
* or we just do one edge in each of those cases. Makes traversal harder but less nodes. would need to check incoming and outgoing for each node if searching for a relationship between two.
```
[
{start: rec1, end: rec2, type: ADJACENCY, data: {
    adjacencyType: 'sub',
    adjacentLine: [point1, point2] // this has no reference to either rectangle object
  }
},
{type: INTERSECT, data: {points: [point1,point2,...]},
{type: CONTAIN} // no data needed. rec1 contains rec2
]
```
