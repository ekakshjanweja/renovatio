import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const PlanDetailsCard = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Project Plans</CardTitle>
          <CardDescription>View plans for the project</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>Explore</CardFooter>
      </Card>
    </>
  );
};
