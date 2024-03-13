import { Point } from "@/utils/point";

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

  t.forEach(ti => {
    let point: Point = { x: 0, y: 0 };
    points.forEach((p, i) => {
      point.x += p.x * factorial(points.length - 1) / (factorial(i) * factorial(points.length - 1 - i)) * Math.pow(1 - ti, points.length - 1 - i) * Math.pow(ti, i);
      point.y += p.y * factorial(points.length - 1) / (factorial(i) * factorial(points.length - 1 - i)) * Math.pow(1 - ti, points.length - 1 - i) * Math.pow(ti, i);
    });
    curvePoints.push(point);
  });

  return curvePoints;
}

function bezierCurveAll(points: Point[], resolution: number): Point[][] {
  let curvePointsAll: Point[][] = [];
  for (let i = 0; i < resolution; i++) {
    curvePointsAll.push(bezierCurve(points, i * 2 + 1));
  }

  return curvePointsAll;
}