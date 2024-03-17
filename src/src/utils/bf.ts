import { Point } from "./data-structure";

export function bezierCurves(points: Point[], iteration: number): Point[] {
  let result: Point[] = [points[0], points[2]];
  let middle: Point[] = [];

  for (let i = 0; i < points.length - 1; i++) {
    let temp: Point = { x: 0, y: 0 };
    temp.x = 0.5 * points[i].x + 0.5 * points[i + 1].x;
    temp.y = 0.5 * points[i].y + 0.5 * points[i + 1].y;
    middle.push(temp);
  }

  for (let i = 1; i < iteration; i++) {
    let resultTemp: Point[] = [];
    resultTemp.push(result[0]);
    for (let j = 0; j < middle.length - 1; j++) {
      let temp: Point = { x: 0, y: 0 };
      temp.x = 0.5 * middle[j].x + 0.5 * middle[j + 1].x;
      temp.y = 0.5 * middle[j].y + 0.5 * middle[j + 1].y;
      resultTemp.push(temp);
    }
    resultTemp.push(result[result.length - 1]);
    result = resultTemp.slice();

    let middleTemp: Point[] = [];
    while (middle.length !== 0) {
      let temp: Point = { x: 0, y: 0 };
      temp.x = 0.5 * resultTemp[0].x + 0.5 * middle[0].x;
      temp.y = 0.5 * resultTemp[0].y + 0.5 * middle[0].y;
      middleTemp.push(temp);
      if (middleTemp.length % 2 === 1) {
        resultTemp.shift();
      } else {
        middle.shift();
      }
    }
    middle = middleTemp.slice();
  }

  let resultTemp: Point[] = [];
  resultTemp.push(result[0]);
  for (let j = 0; j < middle.length - 1; j++) {
    let temp: Point = { x: 0, y: 0 };
    temp.x = 0.5 * middle[j].x + 0.5 * middle[j + 1].x;
    temp.y = 0.5 * middle[j].y + 0.5 * middle[j + 1].y;
    resultTemp.push(temp);
  }
  resultTemp.push(result[result.length - 1]);
  result = resultTemp.slice();
  return result;
}
