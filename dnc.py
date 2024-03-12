import matplotlib.pyplot as plt
import numpy as np
import time

def bezier_curve(points, t):
    if len(points) == 1:
        return points[0]
    
    new_points = []
    for i in range(len(points)-1):
        mid_point = (1 - t) * points[i] + t * points[i + 1]
        new_points.append(mid_point)
    
    return bezier_curve(new_points, t)

def plot_bezier_curve(points, resolution):
    t = np.linspace(0, 1, resolution)

    start = time.time()
    curve_points = np.array([bezier_curve(points, ti) for ti in t])
    end = time.time()

    print("Time needed: ", end - start)
    
    plt.figure()
    plt.plot(curve_points[:,0], curve_points[:,1], label='Bézier Curve', color='blue')
    plt.scatter(points[:,0], points[:,1], label='Control Points', color='red')
    plt.legend()
    plt.gca().set_aspect('equal', adjustable='box')
    plt.show()

# x0, y0 = map(int, input("Masukkan pasangan titik pertama: ").split())
# x1, y1 = map(int, input("Masukkan pasangan titik kedua: ").split())
# x2, y2 = map(int, input("Masukkan pasangan titik ketiga: ").split())

x0 = 1
y0 = 1
x1 = 4
y1 = 10
x2 = 7
y2 = 1

res = int(input("Masukkan jumlah iterasi: "))

plot_bezier_curve(np.array([[x0, y0], [x1, y1], [x2, y2]]), res*2 + 1)