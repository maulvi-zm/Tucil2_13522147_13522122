import matplotlib.pyplot as plt

def bezier_curve(points, iteration):
    result = [points[0], points[2]]
    middle = []

    for i in range(len(points) - 1):
        temp = [0,0]
        temp[0] = 0.5 * points[i][0] + 0.5 * points[i+1][0]
        temp[1] = 0.5 * points[i][1] + 0.5 * points[i+1][1]
        middle.append(temp)

    for i in range(1, iteration):
        resultTemp = []
        resultTemp.append(result[0])
        for j in range(len(middle) - 1):
            temp = [0,0]
            temp[0] = 0.5 * middle[j][0] + 0.5 * middle[j+1][0]
            temp[1] = 0.5 * middle[j][1] + 0.5 * middle[j+1][1]
            resultTemp.append(temp)
        resultTemp.append(result[len(result)-1])
        result = resultTemp.copy()

        middleTemp = []
        while(len(middle) != 0):
            temp = [0,0]
            temp[0] = 0.5 * resultTemp[0][0] + 0.5 * middle[0][0]
            temp[1] = 0.5 * resultTemp[0][1] + 0.5 * middle[0][1]
            middleTemp.append(temp)
            if (len(middleTemp) % 2 == 1):
                resultTemp.pop(0)
            else:
                middle.pop(0)
        middle = middleTemp.copy()

    resultTemp = []
    resultTemp.append(result[0])
    for j in range(len(middle) - 1):
        temp = [0,0]
        temp[0] = 0.5 * middle[j][0] + 0.5 * middle[j+1][0]
        temp[1] = 0.5 * middle[j][1] + 0.5 * middle[j+1][1]
        resultTemp.append(temp)
    resultTemp.append(result[len(result)-1])
    result = resultTemp.copy()
    return result

def ngeplot(arr):
    x = [point[0] for point in arr]
    y = [point[1] for point in arr]
    
    plt.figure()
    plt.plot(x, y)
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.title('Plot Garis dari Array Titik')
    plt.grid(True)
    plt.show()

p = [[1,1], [2,10], [7,1]]

duar = bezier_curve(p, 5)

print(duar)
print(len(duar))