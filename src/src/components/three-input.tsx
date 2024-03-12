import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { usePointContext } from "@/hooks/usePointContext";

function ThreeInput() {
  const { threePoint, setThreePointAtIndex, setIteration } = usePointContext();
  return (
    <>
      <div className='space-y-1'>
        <Label htmlFor='name'>Point 1</Label>
        <div className='flex space-x-2 items-center'>
          <span>x : </span>
          <Input
            id='name'
            defaultValue='0'
            type='number'
            className='w-[20%]'
            onChange={(e) => {
              setThreePointAtIndex(0, {
                x: parseFloat(e.target.value),
                y: threePoint[0].y,
              });
            }}
          />
          <span>y : </span>
          <Input
            id='name'
            defaultValue='0'
            type='number'
            className='w-[20%]'
            onChange={(e) => {
              setThreePointAtIndex(0, {
                x: threePoint[0].x,
                y: parseFloat(e.target.value),
              });
            }}
          />
        </div>
      </div>
      <div className='space-y-1'>
        <Label htmlFor='name'>Point 2</Label>
        <div className='flex space-x-2 items-center'>
          <span>x : </span>
          <Input
            id='name'
            defaultValue='0'
            type='number'
            className='w-[20%]'
            onChange={(e) => {
              setThreePointAtIndex(1, {
                x: parseFloat(e.target.value),
                y: threePoint[1].y,
              });
            }}
          />
          <span>y : </span>
          <Input
            id='name'
            defaultValue='0'
            type='number'
            className='w-[20%]'
            onChange={(e) => {
              setThreePointAtIndex(1, {
                x: threePoint[1].x,
                y: parseFloat(e.target.value),
              });
            }}
          />
        </div>
      </div>
      <div className='space-y-1'>
        <Label htmlFor='name'>Point 3</Label>
        <div className='flex space-x-2 items-center'>
          <span>x : </span>
          <Input
            id='name'
            defaultValue='0'
            type='number'
            className='w-[20%]'
            onChange={(e) => {
              setThreePointAtIndex(2, {
                x: parseFloat(e.target.value),
                y: threePoint[2].y,
              });
            }}
          />
          <span>y : </span>
          <Input
            id='name'
            defaultValue='0'
            type='number'
            className='w-[20%]'
            onChange={(e) => {
              setThreePointAtIndex(2, {
                x: threePoint[2].x,
                y: parseFloat(e.target.value),
              });
            }}
          />
        </div>
      </div>

      <div className='space-y-1'>
        <Label htmlFor='name'>Iterasi</Label>
        <Input
          id='iteration'
          type='number'
          onChange={(e) => {
            setIteration(parseInt(e.target.value ? e.target.value : "0"));
            console.log(e.target.value);
          }}
        />
      </div>
    </>
  );
}

export default ThreeInput;
