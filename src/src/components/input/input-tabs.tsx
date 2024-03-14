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
import NInput from "./n-inputs";
import AlgoritmSwitch from "./algorithm-switch-submit";

export function InputTabs() {
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
              <AlgoritmSwitch />
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
              <AlgoritmSwitch />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
