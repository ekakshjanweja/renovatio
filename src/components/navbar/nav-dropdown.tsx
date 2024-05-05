"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const NavbarDropdownMenu = () => {
  const session = useSession();

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col items-start">
          <SheetHeader>
            <SheetTitle className="text-start">
              Welcome to renovatio.
            </SheetTitle>
            <SheetDescription className="text-start">
              We make the process of renovation super simple.
            </SheetDescription>
            <div className="text-start">
              <Link
                href={
                  "https://www.instagram.com/naresh_vijh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                }
              >
                <Button variant="link">instagram</Button>
              </Link>

              <Link href={"/about-us"}>
                <Button variant="link">about us</Button>
              </Link>

              {session.status === "unauthenticated" ? (
                <>
                  <Link href={"/sign-in"}>
                    <Button variant="link">sign in</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={"/dashboard"}>
                    <Button variant="link">dashboard</Button>
                  </Link>
                </>
              )}
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
