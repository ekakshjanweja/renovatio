
import { ImagesGridHomePage } from "@/components/images-grid-home-page";
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

import Link from "next/link";

const GetQuotePage = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-[350px] md:w-[450px]">
          <CardHeader>
            <CardTitle>Get Quote</CardTitle>
            <CardDescription>
              We just need some basic information to make a offer.
            </CardDescription>

            <CardDescription className="text-red-500 opacity-80">
              client-id-054-2024/q1
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91 1234567890" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="johndoe@example.com" />
                </div>

                <div className="flex gap-x-6">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="area">Area</Label>
                    <Input id="area" placeholder="2500 sqm" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Delhi" />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={"/"}>
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default GetQuotePage;
