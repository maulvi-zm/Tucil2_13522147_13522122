import { BezierResult, Point } from "@/utils/data-structure";

// export interface Point {
//   x: number;
//   y: number;
// }

function factorial(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function bezierCurve(points: Point[], resolution: number): Point[] {
  const t: number[] = Array.from(
    { length: resolution },
    (_, i) => i / (resolution - 1)
  );

  let curvePoints: Point[] = [];

  t.forEach((ti) => {
    let point: Point = { x: 0, y: 0 };
    points.forEach((p, i) => {
      point.x +=
        ((p.x * factorial(points.length - 1)) /
          (factorial(i) * factorial(points.length - 1 - i))) *
        Math.pow(1 - ti, points.length - 1 - i) *
        Math.pow(ti, i);
      point.y +=
        ((p.y * factorial(points.length - 1)) /
          (factorial(i) * factorial(points.length - 1 - i))) *
        Math.pow(1 - ti, points.length - 1 - i) *
        Math.pow(ti, i);
    });
    curvePoints.push(point);
  });

  return curvePoints;
}

export function bezierCurveAllBF(
  points: Point[],
  resolution: number
): BezierResult {
  let startTime = performance.now();

  let result: BezierResult = { matrix: [[]], time: 0 };
  let curvePointsAll: Point[][] = [];
  for (let i = 0; i < resolution; i++) {
    curvePointsAll.push(bezierCurve(points, i * 2 + 1));
  }

  for (let i = 1; i < resolution; i++) {
    for (let j = 1; j < curvePointsAll[i-1].length-1; j++) {
      if (!curvePointsAll[i].includes(curvePointsAll[i-1][j])) {
        for (let k = 1; k < curvePointsAll[i].length-1; k++) {
          if (Math.abs(curvePointsAll[i-1][j].x) > Math.abs(curvePointsAll[i][k].x) && Math.abs(curvePointsAll[i-1][j].x) < Math.abs(curvePointsAll[i][k+1].x)) {
            curvePointsAll[i].splice(k+1, 0, curvePointsAll[i-1][j]);
          }
        }
      }
    }
  }

  result.matrix = curvePointsAll;

  let endTime = performance.now();

  result.time = endTime - startTime;

  return result;
}
