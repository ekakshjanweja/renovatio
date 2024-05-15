import { getUserById } from "@/services/user-service";
import notFound from "../../../not-found";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileSection } from "@/components/navbar/profile-section";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface Props {
  designerId: string | null;
}

export const DesignerDetailsCard = async ({ designerId }: Props) => {
  if (!designerId) {
    notFound();
  }

  const designer = await getUserById(designerId!);

  return (
    <>
      <Card className="h-[300px] lg:h-[350px] xl:h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <p>{designer.name}</p>
            <ProfileSection image={designer.image} username={designer.name} />
          </CardTitle>
          <CardDescription>Designer</CardDescription>
        </CardHeader>
        <CardContent className="h-1/2 overflow-hidden">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry Lorem Ipsum has been the industrys standard dummy text ever
            since the 1500s when an unknown printer took a galley of type and
            scrambled it to make a type specimen book It has survived not only
            five centuries
          </p>
        </CardContent>
        <CardFooter className="text-sm">
          <Button
            variant={"outline"}
            className="flex text-muted-foreground items-center justify-center border border-muted-foreground p-2 rounded-full text-sm overflow-hidden"
          >
            <Phone className="h-4 w-4 mr-2" />
            <p className="text-lime-500">Call</p>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
