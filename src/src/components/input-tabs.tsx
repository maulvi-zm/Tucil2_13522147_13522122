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

export function InputTabs() {
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
            <div className='space-y-1'>
              <Label htmlFor='name'>Point 1</Label>
              <div className='flex space-x-2 items-center'>
                <span>x : </span>
                <Input
                  id='name'
                  defaultValue='0'
                  type='number'
                  className='w-[20%]'
                />
                <span>y : </span>
                <Input
                  id='name'
                  defaultValue='0'
                  type='number'
                  className='w-[20%]'
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
                />
                <span>y : </span>
                <Input
                  id='name'
                  defaultValue='0'
                  type='number'
                  className='w-[20%]'
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
                />
                <span>y : </span>
                <Input
                  id='name'
                  defaultValue='0'
                  type='number'
                  className='w-[20%]'
                />
              </div>
            </div>

            <div className='space-y-1'>
              <Label htmlFor='name'>Iterasi</Label>
              <Input id='name' defaultValue='0' type='number' />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
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
