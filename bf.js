function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

function bezierCurve(points, resolution) {
    let t = Array.from({ length: resolution }, (_, i) => i / (resolution - 1));
    let curvePoints = [];

    t.forEach(ti => {
        let point = [0.0, 0.0];
        points.forEach((p, i) => {
            point[0] += p[0] * factorial(points.length - 1) / (factorial(i) * factorial(points.length - 1 - i)) * Math.pow(1 - ti, points.length - 1 - i) * Math.pow(ti, i);
            point[1] += p[1] * factorial(points.length - 1) / (factorial(i) * factorial(points.length - 1 - i)) * Math.pow(1 - ti, points.length - 1 - i) * Math.pow(ti, i);
        });
        curvePoints.push(point);
    });

    return curvePoints;
}

function bezierCurveAll(points, resolution) {
    let curvePointsAll = [];
    for (let i = 0; i < resolution; i++) {
        curvePointsAll.push(bezierCurve(points, i * 2 + 1));
    }

    return curvePointsAll;
}

let x0 = 1;
let y0 = 1;
let x1 = 4;
let y1 = 10;
let x2 = 7;
let y2 = 1;
let res = 5;

let points = [[x0, y0], [x1, y1], [x2, y2]];

let curvePointsAll = bezierCurveAll(points, res);

console.log(curvePointsAll)
