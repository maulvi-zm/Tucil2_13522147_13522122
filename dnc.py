import matplotlib.pyplot as plt
import numpy as np

def bezier_curve(points, t):
    if len(points) == 1:
        return points[0]
    
    new_points = []
    for i in range(len(points)-1):
        mid_point = (1 - t) * points[i] + t * points[i + 1]
        new_points.append(mid_point)
    
    return bezier_curve(new_points, t)
    
# x0, y0 = map(int, input("Masukkan pasangan titik pertama: ").split())
# x1, y1 = map(int, input("Masukkan pasangan titik kedua: ").split())
# x2, y2 = map(int, input("Masukkan pasangan titik ketiga: ").split())
# res = int(input("Masukkan jumlah iterasi: "))

x0 = 1
y0 = 1
x1 = 4
y1 = 10
x2 = 7
y2 = 1
res = 5

points = np.array([[x0, y0], [x1, y1], [x2, y2]])
curve_points = []
for i in range (res):
    t = np.linspace(0, 1, i * 2 + 1)
    curve_points.append(np.array([bezier_curve(points, ti) for ti in t]))

#   for (let i = 1; i < resolution; i++) {
#     for (let j = 1; j < curvePointsAll[i-1].length-1; j++) {
#       if (!curvePointsAll[i].includes(curvePointsAll[i-1][j])) {
#           for (let k = 1; k < curvePointsAll[i].length-1; k++) {
#             if (curvePointsAll[i-1][j].x > curvePointsAll[i][k].x && curvePointsAll[i-1][j].x < curvePointsAll[i][k+1].x) {
#             curvePointsAll[i].splice(k+1, 0, curvePointsAll[i-1][j]);
#           }
#         }
#       }
#     }
#   }
    
# for i in range (1, res):
#     for j in range (1, len(curve_points[i-1])-1):
#         if (curve_points[i-1][j] not in curve_points[i]):
#             for k in range (1, len(curve_points[i])-1):
#                 if (curve_points[i-1][j][0] > curve_points[i][k][0]):
#                     if (curve_points[i-1][j][0] < curve_points[i][k+1][0]):
#                         curve_points[i] = np.insert(curve_points[i], k+1, curve_points[i-1][j])
    
for i in range (1, res):
    for j in range (1, len(curve_points[i-1])-1):
        if (curve_points[i-1][j] not in curve_points[i]):
            curve_points[i] = np.insert(curve_points[i], j+1, curve_points[i-1][j])
            print("yg dimasukin ",curve_points[i-1][j])
            print("dari ", curve_points[i-1])
            print("di iterasi ke ", i)


for i in range(len(curve_points)):
    print("iterasi ke ", i)
    print(curve_points[i])
    print("length nya ", len(curve_points[i]))
    # for j in range(len(curve_points[i])):
    #     print("trololo")
    #     print(curve_points[i][j][0])