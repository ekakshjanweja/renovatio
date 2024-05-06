import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ProfileSection } from "./profile-section";
import { auth } from "@/auth";

interface NavbarDropdownMenuProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string;
    phone: string | null;
    isDesigner: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };
}

export const NavbarDropdownMenu = async ({ user }: NavbarDropdownMenuProps) => {
  const session = await auth();

  return (
    <>
      <Sheet>
        <SheetTrigger className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 rounded-md flex justify-center items-center">
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent className="flex flex-col items-start">
          <SheetHeader>
            <SheetTitle className="text-start">
              Welcome to renovatio.
            </SheetTitle>
            <SheetDescription className="text-start">
              We make the process of renovation super simple.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col text-xl text-start pt-4 gap-4">
            <Link
              href={
                "https://www.instagram.com/naresh_vijh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              }
            >
              instagram
            </Link>

            <Link href={"/about-us"}>about us</Link>

            {session === null ? (
              <>
                <Link href={"/sign-in"}>sign in</Link>
              </>
            ) : (
              <>
                <Link href={"/dashboard"}>dashboard</Link>
              </>
            )}
            <div className="absolute bottom-10 right-10">
              {session === null ? null : (
                <ProfileSection image={user.image} username={user.name} />
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
