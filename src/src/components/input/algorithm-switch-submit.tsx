import { useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { usePointContext } from "@/hooks/usePointContext";
import { Button } from "../ui/button";
import { bezierCurveAllBF } from "@/utils/bf";
import { makeMatrixAnimation as DNC } from "@/utils/dnc";
import { useToast } from "../ui/use-toast";

function AlgoritmSwitch({ swith_type }: { swith_type: string }) {
  const {
    setResultPoint,
    threePoint,
    iteration,
    setShowedIteration,
    nPoint,
    setType,
  } = usePointContext();

  const { toast } = useToast();

  const [algorithm, setAlgorithm] = useState("brute-force");

  const handleSwitch = () => {
    if (algorithm === "brute-force") {
      setAlgorithm("divide-and-conquer");
    } else {
      setAlgorithm("brute-force");
    }
  };

  function isAllPointsUnique(points: { x: number; y: number }[]) {
    console.log(points);
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].x === points[j].x && points[i].y === points[j].y) {
          console.log(points[i], points[j], i, j);
          return false;
        }
      }
    }
    return true;
  }

  const hadleSubmit = () => {
    console.log(nPoint);
    if (iteration < 1) {
      toast({
        title: "Error!",
        description: "Iterasi harus lebih dari 0",
        variant: "destructive",
      });
      return;
    }

    if (!isAllPointsUnique(threePoint) && swith_type === "three-point") {
      toast({
        title: "Error!",
        description: "Titik harus unik",
        variant: "destructive",
      });
      return;
    }

    if (!isAllPointsUnique(nPoint) && swith_type === "n-point") {
      toast({
        title: "Error!",
        description: "Titik harus unik",
        variant: "destructive",
      });
    }

    let result;
    if (algorithm === "brute-force") {
      if (swith_type === "three-points") {
        setType("three-point");
        result = bezierCurveAllBF(threePoint, iteration);
      } else {
        setType("n-point");
        result = bezierCurveAllBF(nPoint, iteration);
      }
    } else {
      if (swith_type === "three-points") {
        setType("three-point");
        result = DNC(threePoint, iteration);
      } else {
        setType("n-point");
        result = DNC(nPoint, iteration);
      }
    }

    setResultPoint(result);
    setShowedIteration(0);

    toast({
      title: "Success!",
      description:
        "Berhasil membuat bezier curve, gunakan slider untuk melihat hasil",
    });
  };

  return (
    <>
      <Button onClick={hadleSubmit}>Submit</Button>
      <div className='flex items-center space-x-2'>
        <Label htmlFor='brute-force'>BF</Label>
        <Switch onCheckedChange={handleSwitch} />
        <Label htmlFor='divide-and-conquer'>DNC</Label>
      </div>
    </>
  );
}

export default AlgoritmSwitch;
