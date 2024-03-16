import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { usePointContext } from "@/hooks/usePointContext";
import { NPointSelector } from "./npoint-selector";

function NInput() {
  const { setNPoint, setIteration } = usePointContext();
  return (
    <>
      <div className='space-y-1 mb-4'>
        <Label htmlFor='current'>Banyak titik</Label>
        <Input
          id='current'
          type='number'
          onChange={(e) => {
            const n = parseInt(e.target.value);
            setNPoint(new Array(n).fill({ x: 0, y: 0 }));
          }}
        />
      </div>
      <NPointSelector />

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

export default NInput;
