function bezierCurve(points, t) {
    if (points.length === 1) {
        return points[0];
    }

    let newPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
        let midPoint = [(1 - t) * points[i][0] + t * points[i + 1][0],
                        (1 - t) * points[i][1] + t * points[i + 1][1]];
        newPoints.push(midPoint);
    }

    return bezierCurve(newPoints, t);
}

function bezierCurveAll(points, resolution) {
    let curvePointsAll = [];
        for (let i = 0; i < resolution; i++) {
        let t = Array.from({ length: i * 2 + 1 }, (_, j) => j / (i * 2));
        curvePointsAll.push(t.map(ti => bezierCurve(points, ti)));
    }

    for (let i = 1; i < resolution; i++) {
        for (let j = 1; j < curvePointsAll[i-1].length-1; j++) {
          if (!curvePointsAll[i].includes(curvePointsAll[i-1][j])) {
            for (let k = 1; k < curvePointsAll[i].length-1; k++) {
              if (curvePointsAll[i-1][j].x > curvePointsAll[i][k].x && curvePointsAll[i-1][j].x < curvePointsAll[i][k+1].x) {
                curvePointsAll[i].splice(k+1, 0, curvePointsAll[i-1][j]);
              }
            }
          }
        }
      }

    return curvePointsAll;
}

let x0 = 1;
let y0 = 1;
let x1 = -4;
let y1 = 10;
let x2 = 7;
let y2 = 1;
let res = 5;

let points = [[x0, y0], [x1, y1], [x2, y2]];

let curvePointsAll = bezierCurveAll(points, res);

console.log(curvePointsAll)
