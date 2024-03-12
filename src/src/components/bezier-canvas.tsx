import { useEffect, useRef } from "react";
import { pointsData } from "@/utils/point";

function BezierCurve() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }
    const screenWidth = window.innerWidth / 2 - 50;
    const screenHeight = screenWidth;

    // Set canvas width and height
    canvas.width = screenWidth;
    canvas.height = screenHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    // Your code to calculate Bezier points using pointsData
    const bezierPoints = pointsData;

    // Draw points on canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    // Draw lines between consecutive points
    ctx.beginPath();
    ctx.moveTo(bezierPoints[0].x, bezierPoints[0].y);
    for (let i = 1; i < bezierPoints.length; i++) {
      ctx.lineTo(bezierPoints[i].x, bezierPoints[i].y);
    }
    ctx.stroke();

    // Draw circles at each point
    bezierPoints.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className='bg-black rounded-lg'></canvas>
    </div>
  );
}

export default BezierCurve;
