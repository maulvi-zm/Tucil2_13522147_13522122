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
 * Applies the Divide and Conquer algorithm to divide a line segment into multiple points.
 *
 * @param mainPoints - The main points of the line segment.
 * @param control - The control point used for dividing the line segment.
 * @param iterations - The number of iterations to perform the algorithm.
 * @returns An array of points representing the divided line segment.
 * @throws Error if the mainPoints array does not contain exactly 2 points.
 */
function DivideAndConquer(
  mainPoints: Point[],
  control: Point,
  iterations: number
): Point[] {
  // Check if the main points array contains exactly 2 points
  if (mainPoints.length !== 2) {
    throw new Error("Invalid main points");
  }

  // Find the midpoint between the main points and the control point
  const q0: Point = findMidPoint(mainPoints[0], control);
  const q1: Point = findMidPoint(control, mainPoints[1]);

  // Find the midpoint between the two new points
  const s1: Point = findMidPoint(q0, q1);

  // If iterations <= 1, return the main points and the new point (Base case)
  if (iterations <= 1) {
    return [mainPoints[0], s1, mainPoints[1]];
  } else {
    // Recursively call DivideAndConquer with the new points
    const left = DivideAndConquer([mainPoints[0], s1], q0, iterations - 1);
    const right = DivideAndConquer([s1, mainPoints[1]], q1, iterations - 1);

    return left.concat(right.slice(1));
  }
}

/**
 * Calculates the points for a smooth curve based on the given points.
 *
 * @param points - An array of points.
 * @returns An array of points representing the smooth curve.
 */
function handleEvenPoints(points: Point[]): Point[] {
  let mainPoints: Point[] = [];
  let controlPoints: Point[] = [];

  for (let i = 0; i < points.length - 1; i += 1) {
    let midPoint: Point = findMidPoint(points[i], points[i + 1]);
    controlPoints.push(midPoint);
  }

  // Push the first point to the main points
  mainPoints.push(points[0]);

  // Calculate the main points based on the control points
  for (let i = 0; i < controlPoints.length - 1; i += 1) {
    let midPoint: Point = findMidPoint(controlPoints[i], controlPoints[i + 1]);
    mainPoints.push(midPoint);
  }

  // Push the last point to the main points
  mainPoints.push(points[points.length - 1]);

  let result: Point[] = [];

  // Combine the main points and control points
  for (let i = 0; i < controlPoints.length; i += 1) {
    result.push(mainPoints[i]);
    result.push(controlPoints[i]);
  }

  // Push the last main point
  result.push(mainPoints[mainPoints.length - 1]);

  return result;
}

/**
 * Calculates the points on a bezier curve given the control points and the number of iterations.
 * @param points - An array of points representing the control points of the bezier curve.
 * @param iterations - The number of iterations to perform for the bezier curve calculation.
 * @returns An array of points representing the points on the bezier curve.
 * @throws Error if the points length is less than 3 or if the iterations is less than 1.
 */
function bezierCurves(points: Point[], iterations: number): Point[] {
  // If there's < 3 points, return it immediately
  if (points.length < 3) {
    throw new Error("Invalid points length");
  }

  // If iterations < 1, return error
  if (iterations < 1) {
    throw new Error("Invalid iterations");
  }

  let result: Point[] = [];

  // If the number of points is even, then handle it first
  if (points.length % 2 === 0) {
    points = handleEvenPoints(points);
    iterations -= 1;
  }

  // Divide and conquer
  for (let i = 0; i <= points.length - 2; i += 2) {
    const mainPoints = [points[i], points[i + 2]];
    const control = points[i + 1];
    const curve = DivideAndConquer(mainPoints, control, iterations);

    if (result.length > 0 && result[result.length - 1] === mainPoints[0]) {
      result = result.concat(curve.slice(1));
    } else {
      result = result.concat(curve);
    }
  }

  return result;
}

/**
 * Generates a matrix animation using Bezier curves.
 * @param points - An array of points representing the control points of the Bezier curves.
 * @param iteration - The number of iterations to perform for the Bezier curves.
 * @returns The generated matrix animation as a BezierResult object.
 */
export function makeMatrixAnimation(
  points: Point[],
  iteration: number
): BezierResult {
  let num_of_point = points.length;
  let BezierMatrix: BezierResult = { matrix: [], time: -1 };

  let timeStart = performance.now();
  let result = bezierCurves(points, iteration);
  let timeEnd = performance.now();

  BezierMatrix.time = timeEnd - timeStart;

  let simpangan = (result.length - num_of_point) / (num_of_point - 1) + 1;
  let temp: Point[] = [];

  while (num_of_point <= result.length) {
    for (let i = 0; i < result.length; i += simpangan) {
      temp.push(result[i]);
    }
    BezierMatrix.matrix.push(temp);

    temp = [];
    num_of_point = 2 * num_of_point - 1;
    simpangan = (result.length - num_of_point) / (num_of_point - 1) + 1;
  }

  return BezierMatrix;
}
