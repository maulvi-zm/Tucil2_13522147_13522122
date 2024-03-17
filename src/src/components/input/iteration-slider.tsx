import { useEffect, useState } from "react";
import { Slider } from "../ui/slider";
import { usePointContext } from "@/hooks/usePointContext";

function IterationSlider() {
  const { setShowedIteration, resultPoint } = usePointContext();

  const [sliderValue, setSliderValue] = useState<number[]>([1]);

  useEffect(() => {
    setSliderValue([1]);
  }, [resultPoint]);

  return (
    resultPoint.matrix.length > 1 && (
      <div className='mt-2'>
        <Slider
          defaultValue={sliderValue}
          min={1}
          max={resultPoint.matrix.length}
          step={1}
          onValueChange={(value) => {
            setShowedIteration(value[0]);
          }}
        />
      </div>
    )
  );
}

export default IterationSlider;
