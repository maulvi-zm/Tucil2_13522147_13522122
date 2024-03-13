import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThreeInput from "./three-input";
import { bezierCurveAllDNC } from "@/utils/dnc";
import { bezierCurveAllBF } from "@/utils/bf";
import { usePointContext } from "@/hooks/usePointContext";
import NInput from "./n-inputs";
import { useState } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export function InputTabs() {
  const { setResultPoint, threePoint, iteration, setShowedIteration } =
    usePointContext();

  const [algorithm, setAlgorithm] = useState("brute-force");
  const [processingTime, setProcessingTime] = useState(-1);

  const handleSwitch = () => {
    if (algorithm === "brute-force") {
      setAlgorithm("divide-and-conquer");
    } else {
      setAlgorithm("brute-force");
    }
  };

  return (
    <>
      <Tabs defaultValue='account' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='account'>3-Points</TabsTrigger>
          <TabsTrigger value='password'>N-Points</TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          <Card>
            <CardHeader>
              <CardTitle>3-Points</CardTitle>
              <CardDescription>
                Masukkan 3 titik dan banyak iterasi
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <ThreeInput />
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
              <Button
                onClick={() => {
                  let result;
                  if (algorithm === "brute-force") {
                    result = bezierCurveAllBF(threePoint, iteration);
                  } else {
                    result = bezierCurveAllDNC(threePoint, iteration);
                  }

                  setResultPoint(result.matrix);
                  setShowedIteration(0);
                  setProcessingTime(result.time);
                }}
              >
                Submit
              </Button>
              <div className='flex items-center space-x-2'>
                <Label htmlFor='brute-force'>BF</Label>
                <Switch onCheckedChange={() => handleSwitch} />
                <Label htmlFor='divide-and-conquer'>DNC</Label>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='password'>
          <Card>
            <CardHeader>
              <CardTitle>N-points</CardTitle>
              <CardDescription>
                Masukkan n titik dan banyak iterasi
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <NInput />
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
              <Button
                onClick={() => {
                  let result;
                  if (algorithm === "brute-force") {
                    result = bezierCurveAllBF(threePoint, iteration);
                  } else {
                    result = bezierCurveAllDNC(threePoint, iteration);
                  }
                  setResultPoint(result.matrix);
                  setShowedIteration(0);
                  setProcessingTime(result.time);
                }}
              >
                Submit
              </Button>
              <div className='flex items-center space-x-2'>
                <Label htmlFor='brute-force'>BF</Label>
                <Switch onCheckedChange={() => handleSwitch} />
                <Label htmlFor='divide-and-conquer'>DNC</Label>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {processingTime !== -1 && (
        <div className='mt-4'>
          <p>Processing Time: {processingTime} ms</p>
        </div>
      )}
    </>
  );
}
