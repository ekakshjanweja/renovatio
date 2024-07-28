import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser, getUserById } from "@/actions/user-action";
import Link from "next/link";
import { GenerateImageButton } from "../generate-image-button";

export const ExploreProjectCard = async ({
  projectId,
  designerId,
}: {
  projectId: string;
  designerId: string;
}) => {
  const user = await getCurrentUser();

  const designer = await getUserById(designerId);

  const designerBio: string =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book It has survived not only five centuries Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book It has survived not only five centuries";

  return (
    <>
      <Card className="lg:h-[350px] xl:h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Explore Project
          </CardTitle>
          <CardDescription>Lorem Ipsum</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex justify-between items-center space-y-2">
              <p className="text-lg">Virtual Renders</p>
              <Link href={`/${projectId}/create-room`}>
                <Button variant={"outline"}>Create Room</Button>
              </Link>
            </div>
            <div className="flex justify-between items-center space-y-4">
              <p className="text-lg">Solace</p>
              <GenerateImageButton />
            </div>

            <div className="flex justify-between items-center space-y-4">
              <p className="text-lg">Generate Image</p>
              <Button variant={"outline"}>Upload Plan</Button>
            </div>
            {/* <CardHeader className="px-0">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <CardTitle>
                    <p>{designer.name}</p>
                  </CardTitle>
                  <CardDescription>Designer</CardDescription>
                </div>

                <Avatar className="h-20 w-20 md:h-7 md:w-7">
                  <AvatarImage src={designer.image!} />
                  <AvatarFallback>
                    {designer.name !== null ? designer.name[0] : "A"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardHeader> */}

            {/* <div className="h-[60px] overflow-hidden mb-4">
              <p className="text-sm text-muted-foreground">{designerBio}</p>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
