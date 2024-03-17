import BezierCurve from "./components/output/bezier-canvas";
import Header from "./components/header";
import { InputTabs } from "./components/input/input-tabs";
import { useWindowSize } from "./hooks/useWindowSize";
import { PointProvider } from "./hooks/usePointContext";
import IterationSlider from "./components/input/iteration-slider";
import ProcessingTime from "./components/output/process-time";

function App() {
  const windowSize = useWindowSize();

  return (
    <>
      <Header />

      <PointProvider>
        <div className={`flex justify-around h-[${windowSize.height - 64}px]`}>
          <div className={`p-10 self-center flex flex-col`}>
            <BezierCurve />
            <IterationSlider />
          </div>

          <div className='self-center'>
            <InputTabs />
            <ProcessingTime />
          </div>
        </div>
      </PointProvider>
    </>
  );
}

export default App;
