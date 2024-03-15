import matplotlib.pyplot as plt
import numpy as np
import time

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

def bezier_curve(controlPoints, t):
    result = [controlPoints[0], controlPoints[len(controlPoints)-1]]
    bezier_curve_recursion(controlPoints, t, result)

    return result

def bezier_curve_recursion(controlPoints, t, result):
    if t == 0:
        return []
    
    newLine = []
    for i in range(len(controlPoints)-1):
        temp = [0,0]
        temp[0] = (controlPoints[i+1][0] - controlPoints[i][0])/2
        temp[1] = (controlPoints[i+1][1] - controlPoints[i][1])/2

        newLine.append([temp[0] + controlPoints[i][0], temp[1] + controlPoints[i][1]])

    result.append([newLine[0][0] + (newLine[1][0] - newLine[0][0])/2, newLine[0][1] + (newLine[1][1] - newLine[0][1])/2])

    bezier_curve_recursion([controlPoints[0], newLine[0], [newLine[0][0] + (newLine[1][0] - newLine[0][0])/2, newLine[0][1] + (newLine[1][1] - newLine[0][1])/2]], t-1, result)
    bezier_curve_recursion([[newLine[0][0] + (newLine[1][0] - newLine[0][0])/2, newLine[0][1] + (newLine[1][1] - newLine[0][1])/2], newLine[1], controlPoints[2]], t-1, result)

def bubble_sort(point):
    n = len(point)
    for i in range(n-1):
        for j in range(n-i-1):
            if point[j][0] > point[j+1][0]:
                point[j], point[j+1] = point[j+1], point[j]
    return point

p = [[1,1], [4,10], [7,1]]
duar = bezier_curve(p, 3)
duar = bubble_sort(duar)

ngeplot(duar)