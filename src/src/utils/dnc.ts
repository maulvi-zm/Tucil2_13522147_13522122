import { BezierResult, Point } from "./data-structure";

function findMidPoint(p1: Point, p2: Point): Point {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

function makeCurve(
  points: Point[],
  controlPoints: Point[]
): {
  controlPoints: Point[];
  points: Point[];
} {
  if (points.length !== controlPoints.length + 1) {
    throw new Error("Invalid control points");
  }

  let controlPointer: number = 0;
  let resultPointer: number = 0;

  let newControlPoints: Point[] = [];
  let newPoints: Point[] = [];

  while (resultPointer < points.length - 1) {
    const point1 = points[resultPointer];
    const point2 = points[resultPointer + 1];
    const controlPoint = controlPoints[controlPointer];

    const q0: Point = findMidPoint(point1, controlPoint);
    const q1: Point = findMidPoint(controlPoint, point2);

    const s1: Point = findMidPoint(q0, q1);

    newControlPoints.push(q0);
    newControlPoints.push(q1);

    newPoints.push(point1);
    newPoints.push(s1);

    resultPointer += 1;
    controlPointer += 1;
  }

  newPoints.push(points[points.length - 1]);

  return {
    controlPoints: newControlPoints,
    points: newPoints,
  };
}

export function bezierCurves(points: Point[], iteration: number): BezierResult {
  if (points.length === 1) {
    return { matrix: [points], time: 0 };
  }

  let controlPoints: Point[] = [];
  let mainPoints: Point[] = [];
  let result: Point[][] = [];

  let timeStart = performance.now();

  if (points.length % 2 == 1) {
    for (let i = 0; i < points.length; i += 1) {
      if (i % 2 == 0) {
        mainPoints.push(points[i]);
      } else {
        controlPoints.push(points[i]);
      }
    }
  } else {
    for (let i = 0; i < points.length - 1; i += 1) {
      let midPoint: Point = findMidPoint(points[i], points[i + 1]);
      controlPoints.push(midPoint);
    }

    mainPoints.push(points[0]);

    for (let i = 0; i < controlPoints.length - 1; i += 1) {
      let midPoint: Point = findMidPoint(
        controlPoints[i],
        controlPoints[i + 1]
      );
      mainPoints.push(midPoint);
    }

    mainPoints.push(points[points.length - 1]);

    result.push(mainPoints);
    iteration -= 1;
  }

  for (let i = 0; i < iteration; i++) {
    const newCurve = makeCurve(mainPoints, controlPoints);
    controlPoints = newCurve.controlPoints;
    mainPoints = newCurve.points;
    result.push(mainPoints);
  }

  let timeEnd = performance.now();

  return { matrix: result, time: timeEnd - timeStart };
}
