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
          <CardTitle>Virtual Renders</CardTitle>
          <CardDescription>View 3d Renders for the project</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <Link href={`/dashboard/${projectId}/create-room`}>
            <Button variant={"link"}>Create Room</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
