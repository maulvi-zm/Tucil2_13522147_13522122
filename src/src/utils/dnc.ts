import { Point } from "@/utils/point";

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

export function bezierCurveAll(points: Point[], resolution: number): Point[][] {
  let curvePointsAll: Point[][] = [];

  for (let i = 0; i < resolution; i++) {
    const t: number[] = Array.from(
      { length: i * 2 + 1 },
      (_, j) => j / (i * 2)
    );

    const curvePoints = t.map((ti) => bezierCurves(points, ti));

    curvePointsAll.push(curvePoints);
  }

  return curvePointsAll;
}
