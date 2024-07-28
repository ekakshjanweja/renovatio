import { getUserById } from "@/actions/user-action";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  designerId: string | null;
}

export const DesignerDetailsCard = async ({ designerId }: Props) => {
  if (!designerId) {
    notFound();
  }

  const designer = await getUserById(designerId!);

  const designerBio: string =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book It has survived not only five centuries Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book It has survived not only five centuries";

  return (
    <>
      <Card className="h-[300px] lg:h-[350px] xl:h-[400px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <CardTitle>
                <p>{designer.name}</p>
              </CardTitle>
              <CardDescription>Designer</CardDescription>
            </div>

            <Avatar className="h-10 w-10 md:h-7 md:w-7">
              <AvatarImage src={designer.image!} />
              <AvatarFallback>
                {designer.name !== null ? designer.name[0] : "A"}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="h-1/2 overflow-hidden  mb-4">
          <p className="text-sm text-muted-foreground overflow-auto">
            {designerBio}
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
