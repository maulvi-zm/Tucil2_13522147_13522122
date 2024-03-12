// points.ts

export interface Point {
  x: number;
  y: number;
}

export const pointsData: Point[] = [
  { x: 100, y: 100 },
  { x: 150, y: 150 },
  { x: 200, y: 200 },
  // Add more points as needed
];
export interface BezierResult {
  matrix: Point[][];
}
