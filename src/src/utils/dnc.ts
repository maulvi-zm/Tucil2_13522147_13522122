import { Point } from "./data-structure";

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
 * Calculates new control points based on the given points using the De Casteljau's algorithm.
 * @param points - The array of points to calculate the new control points from.
 * @returns An array of new control points.
 */
function newControlPoint(points: Point[]): Point[] {
  // If there are 1 point, return an empty array.
  if (points.length <= 1) {
    return points;
  }

  const midPoints: Point[] = [];

  // Loop through the control points and calculate the middle points.
  for (let i = 0; i < points.length - 1; i++) {
    midPoints.push(findMidPoint(points[i], points[i + 1]));
  }

  // Return the new control points.
  return [points[0], ...newControlPoint(midPoints), points[points.length - 1]];
}

/**
 * Applies the Divide and Conquer algorithm to a given array of points.
 *
 * @param points - The array of points to apply the algorithm to.
 * @param iteration - The number of iterations to perform the algorithm.
 * @returns An array of points after applying the Divide and Conquer algorithm.
 */
function DivideAndConquer(points: Point[], iteration: number): Point[] {
  // Find the new control points.
  let temp = newControlPoint(points);

  // If the iteration is 1 or less, return the control points.
  if (iteration <= 1) {
    return temp;
  }

  // Slice the array into two parts.
  const leftSlice = temp.slice(0, points.length);
  const rightSlice = temp.slice(points.length - 1, temp.length);

  // Recursively apply the algorithm to the left and right slices.
  const left = DivideAndConquer(leftSlice, iteration - 1);
  const right = DivideAndConquer(rightSlice, iteration - 1);

  // Return the result of the algorithm.
  return left.concat(right.slice(1));
}

/**
 * Calculates the points on a Bezier curve using the Divide and Conquer algorithm.
 *
 * @param points - An array of control points for the Bezier curve.
 * @param iterations - The number of iterations to perform in the Divide and Conquer algorithm.
 * @returns An array of points representing the Bezier curve.
 */
export function bezierCurves(points: Point[], iterations: number): Point[] {
  let result: Point[] = DivideAndConquer(points, iterations);

  // Return the result of the algorithm.
  return result.filter((_, index) => index % (points.length - 1) === 0);
}
