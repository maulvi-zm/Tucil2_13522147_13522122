import { usePointContext } from "@/hooks/usePointContext";

function ProcessingTime() {
  const { resultPoint } = usePointContext();

  return (
    <>
      {resultPoint.time !== -1 && (
        <div className='mt-4'>
          <p>Processing Time: {resultPoint.time} ms</p>
        </div>
      )}
    </>
  );
}

export default ProcessingTime;
