import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const ThreeDDetailsCard = ({ projectId }: { projectId: string }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Explore Project
          </CardTitle>
          <CardDescription>Lorem Ipsum</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-x-2">
            <div className="flex justify-between items-center">
              <p className="text-lg">Virtual Renders</p>
              <Link href={`/dashboard/${projectId}/create-room`}>
                <Button variant={"outline"}>Create Room</Button>
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg">Virtual Renders</p>
              <Link href={`/dashboard/${projectId}/create-room`}>
                <Button variant={"outline"}>Create Room</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
