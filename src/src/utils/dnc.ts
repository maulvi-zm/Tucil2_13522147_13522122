import { Point } from "./point";

export function bezierCurve(points: Point[], t: number): Point[] {
  if (points.length === 1) {
    return points; // Return an array of points
  }

  let newPoints: Point[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    let midPoint: Point = {
      x: (1 - t) * points[i].x + t * points[i + 1].x,
      y: (1 - t) * points[i].y + t * points[i + 1].y,
    };
    newPoints.push(midPoint);
  }

  return bezierCurve(newPoints, t);
}

export function makeCurvePoint(points: Point[], res: number): Point[][] {
  const curvePoints: Point[][] = [];
  for (let i = 0; i < res; i++) {
    let t: number[] = Array.from({ length: i * 2 + 1 }, (_, j) => j / (i * 2));
    curvePoints[i].push(t.map((ti) => bezierCurve(points, ti)));
  }
  return curvePoints;
}
