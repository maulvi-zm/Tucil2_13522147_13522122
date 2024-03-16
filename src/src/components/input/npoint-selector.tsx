import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePointContext } from "@/hooks/usePointContext";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

export function NPointSelector() {
  const { nPoint, setNPointAtIndex } = usePointContext();
  const [currentPoint, setCurrentPoint] = React.useState(0);
  const inputRefX = React.useRef<HTMLInputElement>(null);
  const inputRefY = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (currentPoint >= nPoint.length) {
      setCurrentPoint(0); // Reset currentPoint if it's out of bounds
    }

    if (nPoint.length <= 0) {
      return;
    }

    if (inputRefX.current && inputRefY.current) {
      inputRefX.current.value = nPoint[currentPoint].x.toString();
      inputRefY.current.value = nPoint[currentPoint].y.toString();
    }
  }, [nPoint.length, currentPoint]);

  if (nPoint.length <= 0) {
    return null;
  }

  return (
    <>
      <Label htmlFor='current'>Edit titik</Label>
      <Select
        onValueChange={(value) => {
          setCurrentPoint(parseInt(value[0]));
          console.log("currentPoint", currentPoint);
        }}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Select a Point' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Points</SelectLabel>
            {nPoint.map((_, index) => (
              <SelectItem
                key={index}
                value={index.toString()}
                onClick={() => {
                  setCurrentPoint(index);
                }}
              >
                {`Point ${index + 1}`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className='flex space-x-2 items-center'>
        <span>x : </span>
        <Input
          ref={inputRefX}
          id='name'
          defaultValue={nPoint[currentPoint].x.toString()}
          type='number'
          className='w-[20%]'
          onChange={(e) => {
            setNPointAtIndex(currentPoint, {
              x: parseFloat(e.target.value),
              y: nPoint[currentPoint].y,
            });
          }}
        />
        <span>y : </span>
        <Input
          ref={inputRefY}
          id='name'
          defaultValue={nPoint[currentPoint].y.toString()}
          type='number'
          className='w-[20%]'
          onChange={(e) => {
            setNPointAtIndex(currentPoint, {
              x: nPoint[currentPoint].x,
              y: parseFloat(e.target.value),
            });
          }}
        />
      </div>
    </>
  );
}
