import { useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { usePointContext } from "@/hooks/usePointContext";
import { Button } from "../ui/button";
import { makeMatrixAnimation } from "@/utils/makeMatrixAnimation";
import { useToast } from "../ui/use-toast";
import { Point } from "@/utils/data-structure";

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

  function isAllPointsUnique(points: Point[]) {
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

    if (nPoint.length < 3 && swith_type === "n-points") {
      toast({
        title: "Error!",
        description: "Titik tidak boleh kurang dari 3",
        variant: "destructive",
      });
      return;
    }

    if (!isAllPointsUnique(threePoint) && swith_type === "three-points") {
      toast({
        title: "Error!",
        description: "Titik harus unik",
        variant: "destructive",
      });
      return;
    }

    if (!isAllPointsUnique(nPoint) && swith_type === "n-points") {
      toast({
        title: "Error!",
        description: "Titik harus unik",
        variant: "destructive",
      });
      return;
    }

    let result;
    if (algorithm === "brute-force") {
      if (swith_type === "three-points") {
        setType("three-point");
        result = makeMatrixAnimation(threePoint, iteration, algorithm);
      } else {
        setType("n-point");
        result = makeMatrixAnimation(nPoint, iteration, algorithm);
      }
    } else {
      if (swith_type === "three-points") {
        setType("three-point");
        result = makeMatrixAnimation(threePoint, iteration, algorithm);
      } else {
        setType("n-point");
        result = makeMatrixAnimation(nPoint, iteration, algorithm);
      }
    }

    setResultPoint(result);
    setShowedIteration(1);

    toast({
      title: "Success!",
      description: `Berhasil membuat bezier curve menggunakan algoritma ${algorithm}, gunakan slider untuk melihat hasil`,
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
