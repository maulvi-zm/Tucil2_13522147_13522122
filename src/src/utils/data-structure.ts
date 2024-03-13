// points.ts

export interface Point {
  x: number;
  y: number;
}

export interface BezierResult {
  matrix: Point[][];
  time: number;
}
