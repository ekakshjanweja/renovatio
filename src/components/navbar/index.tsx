import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavbarDropdownMenu } from "./nav-dropdown";
import { auth } from "@/auth";
import { getCurrentUser } from "@/services/user-service";
import { ProfileSection } from "./profile-section";
import { headers } from "next/headers";
import { Plus } from "lucide-react";

export const Navbar = async () => {
  const headerList = headers();

  const pathname = headerList.get("x-pathname");

  const session = await auth();

  const user = await getCurrentUser();

  return (
    <>
      <nav className="p-2 rounded-md flex justify-between items-center">
        <h1 className="text-lg font-semibold mr-4">renovatio</h1>
        <div className="flex items-center gap-x-4">
          <div className="hidden md:flex">
            <Link
              target="_blank"
              href={
                "https://www.instagram.com/naresh_vijh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              }
              className="hover:underline hover:underline-offset-1"
            >
              instagram
            </Link>
          </div>
          <div className="hidden md:flex">
            <Link
              href={"/about-us"}
              className="hover:underline hover:underline-offset-1"
            >
              about us
            </Link>
          </div>

          <div className="hidden md:flex">
            {session === null ? (
              <Link href={"/get-quote"} className="">
                <Button variant="link" size="sm" className="border-2 uppercase">
                  Get Quote
                </Button>
              </Link>
            ) : user.isDesigner ? (
              <Link href={"/create-project"} className="">
                <Button variant="link" size="sm" className="border-2 uppercase">
                  Create Project
                </Button>
              </Link>
            ) : (
              <Link href={"/get-quote"} className="">
                <Button variant="link" size="sm" className="border-2 uppercase">
                  Get Quote
                </Button>
              </Link>
            )}
          </div>

          <div className="hidden md:flex">
            {session === null ? (
              <>
                <Link href={"/sign-in"}>
                  <Button
                    variant="link"
                    size="sm"
                    className="border-2 uppercase"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="flex gap-x-4">
                  <Link href={"/dashboard"}>
                    <Button
                      variant="link"
                      size="sm"
                      className="border-2 uppercase"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Link href={"/home"}>
                    <Button
                      variant="link"
                      size="sm"
                      className="border-2 uppercase"
                    >
                      Home
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="hidden md:flex">
            {session === null ? null : (
              <ProfileSection image={user.image} username={user.name} />
            )}
          </div>
          <div className="flex md:hidden">
            <NavbarDropdownMenu user={user} />
          </div>
          <ModeToggle />
        </div>
      </nav>
    </>
  );
};
