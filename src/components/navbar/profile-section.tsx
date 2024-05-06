"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
interface ProfileSectionProps {
  image: string | null;
  username: string | null;
}

export const ProfileSection = ({ image, username }: ProfileSectionProps) => {
  return (
    <>
      <Link href={"/settings"}>
        <Avatar className="h-10 w-10 md:h-7 md:w-7">
          <AvatarImage src={image!} />
          <AvatarFallback>
            {username !== null ? username[0] : "A"}
          </AvatarFallback>
        </Avatar>
      </Link>
    </>
  );
};
