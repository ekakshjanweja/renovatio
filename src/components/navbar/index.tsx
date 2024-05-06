import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavbarDropdownMenu } from "./nav-dropdown";
import { auth } from "@/auth";
import { getCurrentUser } from "@/services/user-service";
import { ProfileSection } from "./profile-section";
import { Plus } from "lucide-react";

export const Navbar = async () => {
  const session = await auth();

  const user = await getCurrentUser();

  return (
    <>
      <nav className="p-2 rounded-md flex justify-between items-center">
        <h1 className="text-lg font-semibold mr-4">renovatio</h1>
        <div className="flex items-center gap-x-4">
          <div className="hidden md:flex">instagram</div>
          <div className="hidden md:flex">about us</div>

          {session === null ? (
            <Link href={"/get-quote"} className="">
              <Button variant="link" size="sm" className="border-2 uppercase">
                Get Quote
              </Button>
            </Link>
          ) : user.isDesigner ? (
            <Link href={"/create-project"} className="">
              <Button variant="link" size="sm" className="border-2 uppercase">
                <Plus className="w-4 h-4 mr-2" /> Create Project
              </Button>
            </Link>
          ) : (
            <Link href={"/get-quote"} className="">
              <Button variant="link" size="sm" className="border-2 uppercase">
                Get Quote
              </Button>
            </Link>
          )}

          <div className="hidden md:flex">
            {session === null ? (
              <>
                <Button variant="link" size="sm" className="border-2 uppercase">
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <Button variant="link" size="sm" className="border-2 uppercase">
                  Dashboard
                </Button>
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
