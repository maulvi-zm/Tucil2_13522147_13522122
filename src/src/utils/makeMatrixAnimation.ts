import { Point, BezierResult } from "./data-structure";
import { bezierCurves as BF } from "./bf";
import { bezierCurves as DNC } from "./dnc";
/**
 * Generates a matrix animation using Bezier curves.
 * @param points - An array of points representing the control points of the Bezier curves.
 * @param iteration - The number of iterations to perform for the Bezier curves.
 * @returns The generated matrix animation as a BezierResult object.
 */
export function makeMatrixAnimation(
  points: Point[],
  iteration: number,
  type: string
): BezierResult {
  let num_of_point = points.length;
  let BezierMatrix: BezierResult = { matrix: [], time: -1 };

  let timeStart = performance.now();
  let result: Point[] = [];

  if (type === "brute-force") {
    result = BF(points, iteration);
  } else if (type === "divide-and-conquer") {
    result = DNC(points, iteration);
  }

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
