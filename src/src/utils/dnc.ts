import { BezierResult, Point } from "@/utils/data-structure";

function bezierCurves(points: Point[], t: number): Point {
  if (points.length === 1) {
    return points[0];
  }

  let newPoints: Point[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    let midPoint: Point = {
      x: (1 - t) * points[i].x + t * points[i + 1].x,
      y: (1 - t) * points[i].y + t * points[i + 1].y,
    };

    newPoints.push(midPoint);
  }

  // Recursive call
  return bezierCurves(newPoints, t);
}

export function bezierCurveAllDNC(
  points: Point[],
  resolution: number
): BezierResult {
  let startTime = performance.now();

  let result: BezierResult = { matrix: [[]], time: 0 };

  let curvePointsAll: Point[][] = [];

  for (let i = 0; i < resolution; i++) {
    const t: number[] = Array.from(
      { length: i * 2 + 1 },
      (_, j) => j / (i * 2)
    );

    const curvePoints = t.map((ti) => bezierCurves(points, ti));

    curvePointsAll.push(curvePoints);
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
