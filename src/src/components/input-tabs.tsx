import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThreeInput from "./three-input";
import { bezierCurveAll } from "@/utils/dnc";
import { usePointContext } from "@/hooks/usePointContext";

export function InputTabs() {
  const { setResultPoint, threePoint, iteration, resultPoint } =
    usePointContext();

  return (
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
          <CardFooter>
            <Button
              onClick={() => {
                const result = bezierCurveAll(threePoint, iteration);
                setResultPoint(result);
                console.log(resultPoint);
              }}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value='password'>
        <Card>
          <CardHeader>
            <CardTitle>N-points</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='space-y-1'>
              <Label htmlFor='current'>Current password</Label>
              <Input id='current' type='password' />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='new'>New password</Label>
              <Input id='new' type='password' />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
