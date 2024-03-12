import matplotlib.pyplot as plt
import numpy as np

def bezier_curve(points, resolution):
    t = np.linspace(0, 1, resolution)
    curve_points = []
    for ti in t:
        point = np.array([0.0, 0.0])
        for i, p in enumerate(points):
            point += p * np.math.factorial(len(points)-1) / (np.math.factorial(i) * np.math.factorial(len(points)-1-i)) * (1-ti)**(len(points)-1-i) * ti**i
        curve_points.append(point)
    return np.array(curve_points)

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

curve_points = bezier_curve(points, res*2 + 1)

plt.figure()
plt.plot(curve_points[:,0], curve_points[:,1], label='Bézier Curve', color='green')
plt.scatter(points[:,0], points[:,1], label='Control Points', color='red')
plt.legend()
plt.gca().set_aspect('equal', adjustable='box')
plt.show()
