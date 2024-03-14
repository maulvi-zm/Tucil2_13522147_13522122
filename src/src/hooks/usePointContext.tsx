import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { BezierResult, Point } from "@/utils/data-structure";

interface PointContextType {
  threePoint: Point[];
  setThreePointAtIndex: (index: number, point: Point) => void;
  nPoint: Point[];
  setNPointAtIndex: (index: number, point: Point) => void;
  resultPoint: BezierResult;
  setResultPoint: Dispatch<SetStateAction<BezierResult>>;
  iteration: number;
  setIteration: Dispatch<SetStateAction<number>>;
  showedIteration: number;
  setShowedIteration: Dispatch<SetStateAction<number>>;
  setNPoint: Dispatch<SetStateAction<Point[]>>;
}

// Create the context
const PointContext = createContext<PointContextType>({
  threePoint: [],
  setThreePointAtIndex: () => {},
  nPoint: [],
  setNPointAtIndex: () => {},
  setNPoint: () => {},
  resultPoint: { matrix: [[]], time: 0 },
  setResultPoint: () => {},
  iteration: 0,
  setIteration: () => {},
  showedIteration: 0,
  setShowedIteration: () => {},
});

// Custom hook to consume the context
export const usePointContext = () => useContext(PointContext);

// Context Provider component
export const PointProvider = ({ children }: { children: React.ReactNode }) => {
  // State for three points
  const [threePoint, setThreePoint] = useState<Point[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  // State for n points
  const [nPoint, setNPoint] = useState<Point[]>([]);
  // State for result points
  const [resultPoint, setResultPoint] = useState<BezierResult>({
    matrix: [[]],
    time: -1,
  });
  // State for iteration
  const [iteration, setIteration] = useState<number>(0);
  // State for showed iteration
  const [showedIteration, setShowedIteration] = useState<number>(0);

  // Function to set a point in the threePoint array at a specific index
  const setThreePointAtIndex = (index: number, point: Point) => {
    if (index >= 0 && index < threePoint.length) {
      const newThreePoint = [...threePoint];
      newThreePoint[index] = point;
      setThreePoint(newThreePoint);

      console.log("newThreePoint", newThreePoint);
    } else {
      console.error("Index out of bounds for threePoint array");
    }
  };

  // Function to set a point in the nPoint array at a specific index
  const setNPointAtIndex = (index: number, point: Point) => {
    if (index >= 0 && index < nPoint.length) {
      const newNPoint = [...nPoint];
      newNPoint[index] = point;
      setNPoint(newNPoint);
    } else {
      console.error("Index out of bounds for nPoint array");
    }
  };

  // Context value containing state and setter functions
  const value = {
    threePoint,
    setThreePointAtIndex,
    nPoint,
    setNPointAtIndex,
    resultPoint,
    setResultPoint,
    iteration,
    setIteration,
    showedIteration,
    setShowedIteration,
    setNPoint: setNPoint,
  };

  return (
    <PointContext.Provider value={value}>{children}</PointContext.Provider>
  );
};
