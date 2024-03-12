import BezierCurve from "./components/bezier-canvas";
import Header from "./components/header";
import { InputTabs } from "./components/input-tabs";
import { useWindowSize } from "./utils/useWindowSize";

function App() {
  const windowSize = useWindowSize();

  console.log(windowSize);

  return (
    <>
      <Header />
      <div className={`flex justify-around h-[${windowSize.height - 64}px]`}>
        <div className={`p-10 self-center`}>
          <BezierCurve />
        </div>

        <div className='self-center'>
          <InputTabs />
        </div>
      </div>
    </>
  );
}

export default App;
