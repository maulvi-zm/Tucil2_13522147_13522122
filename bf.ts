function bezierCurveBF(points: number[][], iteration: number): number[][] {
    let result: number[][] = [points[0], points[2]];
    let middle: number[][] = [];

    for (let i = 0; i < points.length - 1; i++) {
        let temp: number[] = [0, 0];
        temp[0] = 0.5 * points[i][0] + 0.5 * points[i + 1][0];
        temp[1] = 0.5 * points[i][1] + 0.5 * points[i + 1][1];
        middle.push(temp);
    }

    for (let i = 1; i < iteration; i++) {
        let resultTemp: number[][] = [];
        resultTemp.push(result[0]);
        for (let j = 0; j < middle.length - 1; j++) {
            let temp: number[] = [0, 0];
            temp[0] = 0.5 * middle[j][0] + 0.5 * middle[j + 1][0];
            temp[1] = 0.5 * middle[j][1] + 0.5 * middle[j + 1][1];
            resultTemp.push(temp);
        }
        resultTemp.push(result[result.length - 1]);
        result = resultTemp.slice();

        let middleTemp: number[][] = [];
        while (middle.length !== 0) {
            let temp: number[] = [0, 0];
            temp[0] = 0.5 * resultTemp[0][0] + 0.5 * middle[0][0];
            temp[1] = 0.5 * resultTemp[0][1] + 0.5 * middle[0][1];
            middleTemp.push(temp);
            if (middleTemp.length % 2 === 1) {
                resultTemp.shift();
            } else {
                middle.shift();
            }
        }
        middle = middleTemp.slice();
    }

    let resultTemp: number[][] = [];
    resultTemp.push(result[0]);
    for (let j = 0; j < middle.length - 1; j++) {
        let temp: number[] = [0, 0];
        temp[0] = 0.5 * middle[j][0] + 0.5 * middle[j + 1][0];
        temp[1] = 0.5 * middle[j][1] + 0.5 * middle[j + 1][1];
        resultTemp.push(temp);
    }
    resultTemp.push(result[result.length - 1]);
    result = resultTemp.slice();
    return result;
}