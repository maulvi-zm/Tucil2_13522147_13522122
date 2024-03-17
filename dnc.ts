function bezierCurveDNC(controlPoints: number[][], t: number): number[][] {
    const result: number[][] = [controlPoints[0], controlPoints[controlPoints.length - 1]];
    bezierCurveRecursion(controlPoints, t, result);
    return result;
}

function bezierCurveRecursion(controlPoints: number[][], t: number, result: number[][]) {
    if (t === 0) {
        return;
    }

    const newLine: number[][] = [];
    for (let j = 0; j < controlPoints.length - 2; j++) {
        for (let i = j; i < j + 2; i++) {
            const temp: number[] = [0, 0];
            temp[0] = (controlPoints[i + 1][0] - controlPoints[i][0]) / 2;
            temp[1] = (controlPoints[i + 1][1] - controlPoints[i][1]) / 2;
            newLine.push([temp[0] + controlPoints[i][0], temp[1] + controlPoints[i][1]]);
        }

        result.push([
            newLine[0][0] + (newLine[1][0] - newLine[0][0]) / 2,
            newLine[0][1] + (newLine[1][1] - newLine[0][1]) / 2
        ]);

        bezierCurveRecursion(
            [controlPoints[j], newLine[0], [newLine[0][0] + (newLine[1][0] - newLine[0][0]) / 2, newLine[0][1] + (newLine[1][1] - newLine[0][1]) / 2]],
            t - 1,
            result
        );

        bezierCurveRecursion(
            [[newLine[0][0] + (newLine[1][0] - newLine[0][0]) / 2, newLine[0][1] + (newLine[1][1] - newLine[0][1]) / 2], newLine[1], controlPoints[j + 2]],
            t - 1,
            result
        );
    }
}

function bubbleSort(point: number[][]): number[][] {
    const n: number = point.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (point[j][0] > point[j + 1][0]) {
                [point[j], point[j + 1]] = [point[j + 1], point[j]];
            }
        }
    }
    return point;
}