import { Menu } from "lucide-react";
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
import { headers } from "next/headers";
import { Button } from "../ui/button";

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
  const headerList = headers();

  const pathname = headerList.get("x-pathname");

  const session = await auth();

  return (
    <>
      <Sheet>
        <SheetTrigger className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 rounded-md flex justify-center items-center">
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent className="flex flex-col items-start">
          <SheetHeader className="flex ">
            {session === null ? null : (
              <ProfileSection image={user.image} username={user.name} />
            )}
            <SheetTitle className="text-start">
              {session === null
                ? "Welcome to renovatio."
                : `Welcome to renovatio, ${user.name}`}
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
              className="hover:underline hover:underline-offset-1"
            >
              instagram
            </Link>

            <Link
              href={"/about-us"}
              className="hover:underline hover:underline-offset-1"
            >
              about us
            </Link>

            {session === null ? (
              <Link href={"/get-quote"} className="">
                <Button variant="link" size="sm" className="border-2 uppercase">
                  Get Quote
                </Button>
              </Link>
            ) : user.isDesigner ? (
              <Link href={"/create-project"} className="">
                <Button variant="link" size="lg" className="border-2 uppercase">
                  {/* <Plus className="w-4 h-4 mr-2" />  */}
                  Create Project
                </Button>
              </Link>
            ) : (
              <Link href={"/get-quote"} className="">
                <Button variant="link" size="lg" className="border-2 uppercase">
                  Get Quote
                </Button>
              </Link>
            )}

            {session === null ? (
              <>
                <Link href={"/sign-in"}>
                  <Button
                    variant="link"
                    size="lg"
                    className="border-2 uppercase"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            ) : pathname !== "/dashboard" ? (
              <>
                <Link href={"dashboard"}>
                  <Button
                    variant="link"
                    size="lg"
                    className="border-2 uppercase"
                  >
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href={"/home"}>
                  <Button
                    variant="link"
                    size="lg"
                    className="border-2 uppercase"
                  >
                    Home
                  </Button>
                </Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
