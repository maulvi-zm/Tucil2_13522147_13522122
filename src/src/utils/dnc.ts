import { BezierResult, Point } from "./data-structure";

/**
 * Finds the midpoint between two points.
 *
 * @param p1 - The first point.
 * @param p2 - The second point.
 * @returns The midpoint between p1 and p2.
 */
function findMidPoint(p1: Point, p2: Point): Point {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

/**
 * Generates a new set of control points and points for a curve based on the given points and control points.
 *
 * @param points - An array of points representing the curve.
 * @param controlPoints - An array of control points for the curve.
 * @returns An object containing the new control points and points for the curve.
 * @throws Error if the number of control points is invalid.
 */
function makeCurve(
  points: Point[],
  controlPoints: Point[]
): {
  controlPoints: Point[];
  points: Point[];
} {
  // Check if the number of control points is valid, just in case
  if (points.length !== controlPoints.length + 1) {
    throw new Error("Invalid control points");
  }

  let controlPointer: number = 0;
  let resultPointer: number = 0;

  let newControlPoints: Point[] = [];
  let newPoints: Point[] = [];

  while (resultPointer < points.length - 1) {
    // Check for current result pointer and control pointer
    const point1 = points[resultPointer];
    const point2 = points[resultPointer + 1];
    const controlPoint = controlPoints[controlPointer];

    // Calculate the new control points
    const q0: Point = findMidPoint(point1, controlPoint);
    const q1: Point = findMidPoint(controlPoint, point2);

    // Calculate the new points
    const s1: Point = findMidPoint(q0, q1);

    // Push the new control points and points to their respective arrays
    newControlPoints.push(q0);
    newControlPoints.push(q1);

    newPoints.push(point1);
    newPoints.push(s1);

    // Increment the pointers
    resultPointer += 1;
    controlPointer += 1;
  }

  // Push the last point to the new points array
  newPoints.push(points[points.length - 1]);

  return {
    controlPoints: newControlPoints,
    points: newPoints,
  };
}

/**
 * Calculates the Bezier curves based on the given points and iteration.
 * @param points - The array of points to create the Bezier curves.
 * @param iteration - The number of iterations to perform for creating the Bezier curves.
 * @returns An object containing the matrix of points representing the Bezier curves and the time taken to calculate them.
 */
export function bezierCurves(points: Point[], iteration: number): BezierResult {
  // If there's only one point, return it immediately
  if (points.length === 1) {
    return { matrix: [points], time: 0 };
  }

  //Make container for control points and main points
  let controlPoints: Point[] = [];
  let mainPoints: Point[] = [];
  let result: Point[][] = [];

  let timeStart = performance.now();

  // If the number of points is odd, then the odd point is a main point
  if (points.length % 2 == 1) {
    for (let i = 0; i < points.length; i += 1) {
      if (i % 2 == 0) {
        mainPoints.push(points[i]);
      } else {
        controlPoints.push(points[i]);
      }
    }
  } else {
    // If the number of points is even, then do the first iteration

    // Calculate the control points
    for (let i = 0; i < points.length - 1; i += 1) {
      let midPoint: Point = findMidPoint(points[i], points[i + 1]);
      controlPoints.push(midPoint);
    }

    // Push the first point to the main points
    mainPoints.push(points[0]);

    // Calculate the main points based on the control points
    for (let i = 0; i < controlPoints.length - 1; i += 1) {
      let midPoint: Point = findMidPoint(
        controlPoints[i],
        controlPoints[i + 1]
      );
      mainPoints.push(midPoint);
    }

    // Push the last point to the main points
    mainPoints.push(points[points.length - 1]);

    // Push the first iteration to the result
    result.push(mainPoints);
    iteration -= 1;
  }

  // Perform the iterations
  for (let i = 0; i < iteration; i++) {
    const newCurve = makeCurve(mainPoints, controlPoints);
    controlPoints = newCurve.controlPoints;
    mainPoints = newCurve.points;
    result.push(mainPoints);
  }

  let timeEnd = performance.now();

  return { matrix: result, time: timeEnd - timeStart };
}
