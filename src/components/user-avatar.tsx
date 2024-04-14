import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserAvatar = async ({ classname }: { classname: string }) => {
  const session = await auth();

  const { id, name, email, image }: any = session?.user;

  return (
    <>
      <Avatar className={classname}>
        <AvatarImage src={image} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
    </>
  );
};
