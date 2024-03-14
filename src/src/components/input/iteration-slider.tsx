import { useEffect, useState } from "react";
import { Slider } from "../ui/slider";
import { usePointContext } from "@/hooks/usePointContext";

function IterationSlider() {
  const { setShowedIteration, showedIteration, resultPoint } =
    usePointContext();

  const [sliderValue, setSliderValue] = useState<number[]>([0]);

  useEffect(() => {
    setSliderValue([0]);
  }, [showedIteration, resultPoint]);

  return (
    resultPoint.matrix.length > 1 && (
      <div className='mt-2'>
        <Slider
          defaultValue={sliderValue}
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
