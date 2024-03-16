import { useEffect, useRef } from "react";
import { usePointContext } from "@/hooks/usePointContext";
import Chart from "chart.js/auto";

function BezierCurve() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartData = useRef<Chart<
    "scatter",
    { x: number; y: number }[],
    string
  > | null>(null);
  const { resultPoint, iteration, showedIteration, nPoint, type, threePoint } =
    usePointContext();
  const screenWidth = window.innerWidth / 2 - 50;
  const screenHeight = screenWidth - 50;

  useEffect(() => {
    if (
      !chartRef.current ||
      !resultPoint.matrix.length ||
      !iteration ||
      !showedIteration
    ) {
      return;
    }

    chartRef.current.width = screenWidth;
    chartRef.current.height = screenHeight;

    const bezierPoints = resultPoint.matrix[showedIteration - 1];

    const data = {
      labels: ["Bezier Curve"],
      datasets: [
        {
          label: "Bezier Curve",
          data: bezierPoints.map((point) => ({ x: point.x, y: point.y })),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 1)",
          pointRadius: 5,
          pointHoverRadius: 8,
          pointStyle: "circle",
          showLine: true,
        },
        {
          label: type === "n-point" ? "N-Point" : "Three-Point",
          data:
            `${type}` === "n-point"
              ? nPoint.map((point) => ({ x: point.x, y: point.y }))
              : threePoint.map((point) => ({ x: point.x, y: point.y })),
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 1)",
          pointRadius: 5,
          pointHoverRadius: 8,
          pointStyle: "circle",
          showLine: true,
          borderDash: [10, 10],
        },
      ],
    };

    if (chartData.current) {
      chartData.current.data = data;
      chartData.current.update();
    } else {
      chartData.current = new Chart(chartRef.current, {
        type: "scatter",
        data,
        options: {
          animation: false,
          scales: {
            x: {
              type: "linear",
              position: "bottom",
            },
            y: {
              type: "linear",
              position: "left",
            },
          },
        },
      });
    }
  }, [resultPoint, showedIteration]);

  return (
    <div className={`p-4 bg-black rounded-lg`}>
      <canvas
        ref={chartRef}
        className={`bg-black rounded-lg`}
        style={{ height: screenHeight, width: screenWidth }}
      ></canvas>
    </div>
  );
}

export default BezierCurve;
