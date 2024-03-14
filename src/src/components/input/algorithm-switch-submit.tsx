import { useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { usePointContext } from "@/hooks/usePointContext";
import { Button } from "../ui/button";
import { bezierCurveAllBF } from "@/utils/bf";
import { bezierCurveAllDNC } from "@/utils/dnc";
import { useToast } from "../ui/use-toast";

function AlgoritmSwitch() {
  const { setResultPoint, threePoint, iteration, setShowedIteration, nPoint } =
    usePointContext();

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
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].x === points[j].x && points[i].y === points[j].y) {
          return false;
        }
      }
    }
    return true;
  }

  const hadleSubmit = () => {
    if (iteration < 1) {
      toast({
        title: "Error!",
        description: "Iterasi harus lebih dari 0",
        variant: "destructive",
      });
      return;
    }

    if (!isAllPointsUnique(threePoint)) {
      toast({
        title: "Error!",
        description: "Titik harus unik",
        variant: "destructive",
      });
      return;
    }

    if (!isAllPointsUnique(nPoint)) {
      toast({
        title: "Error!",
        description: "Titik harus unik",
        variant: "destructive",
      });
    }

    setResultPoint({ matrix: [[]], time: -1 });
    let result;
    if (algorithm === "brute-force") {
      2;
      result = bezierCurveAllBF(threePoint, iteration);
    } else {
      result = bezierCurveAllDNC(threePoint, iteration);
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
