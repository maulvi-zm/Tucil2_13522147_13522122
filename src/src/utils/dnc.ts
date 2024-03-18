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

function newControlPoint(points: Point[]): Point[] {
  if (points.length <= 1) {
    return points;
  }
  let midPoints: Point[] = [];

  for (let i = 0; i < points.length - 1; i++) {
    midPoints.push(findMidPoint(points[i], points[i + 1]));
  }

  return [points[0]]
    .concat(newControlPoint(midPoints))
    .concat(points[points.length - 1]);
}

function DivideAndConquer(points: Point[], iteration: number): Point[] {
  let temp = newControlPoint(points);

  if (iteration <= 1) {
    return temp;
  }

  let leftSlice = temp.slice(0, points.length);
  let rightSlice = temp.slice(points.length - 1, temp.length);

  const left = DivideAndConquer(leftSlice, iteration - 1);
  const right = DivideAndConquer(rightSlice, iteration - 1);

  return left.concat(right.slice(1));
}

export function bezierCurves(points: Point[], iterations: number): Point[] {
  let result: Point[] = [];
  result = DivideAndConquer(points, iterations);

  result = result.filter((_, index) => index % (points.length - 1) === 0);

  return result;
}

const test: Point[] = [
  { x: 0, y: 0 },
  { x: 2, y: 4 },
  { x: 4, y: 0 },
];

console.log(bezierCurves(test, 4).length);
