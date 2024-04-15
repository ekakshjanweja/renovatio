"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useWindowSize } from "@/lib/windows-size";

interface NavbarItem {
  id: number;
  label: string;
  href: string;
  isButton: boolean;
}

const navbarItems: NavbarItem[] = [
  {
    id: 1,
    label: "portfolio",
    href: "/portfolio",
    isButton: false,
  },
  {
    id: 2,
    label: "instagram",
    href: "https://www.instagram.com/naresh_vijh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    isButton: false,
  },
  {
    id: 3,
    label: "about us",
    href: "/about-us",
    isButton: false,
  },
  {
    id: 4,
    label: "signin",
    href: "/sign-in",
    isButton: true,
  },
  {
    id: 4,
    label: "get quote",
    href: "/get-quote",
    isButton: true,
  },
];

export const Navbar = () => {
  const size = useWindowSize();

  let isTooSmall;

  if (typeof window !== "undefined") {
    isTooSmall = size.width !== undefined && size.width < 768;
  }

  return <>{isTooSmall ? <NavbarSmall /> : <NavbarLarge />}</>;
};

const NavbarSmall = () => {
  return (
    <>
      <nav className="h-10 mb-2 flex items-center justify-between text-muted-foreground">
        <Logo />
        <div className="flex items-center justify-end gap-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navbarItems.map((navbarItem) => (
                <DropdownMenuItem key={navbarItem.id}>
                  {navbarItem.isButton ? (
                    <Link href={navbarItem.href}>
                      <Button
                        variant="link"
                        size="sm"
                        className="border-2 uppercase"
                      >
                        {navbarItem.label}
                      </Button>
                    </Link>
                  ) : (
                    <Link href={navbarItem.href}>
                      <div className="text-lg hover:underline underline-offset-2">
                        {navbarItem.label}
                      </div>
                    </Link>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </nav>
    </>
  );
};

const NavbarLarge = () => {
  const session = useSession();

  return (
    <>
      <nav className="h-10 flex items-center justify-between text-muted-foreground">
        <Logo />
        <div className="flex items-center justify-end gap-x-8">
          <div className="flex items-center justify-start gap-x-4">
            <Link
              target="_blank"
              href={
                "https://www.instagram.com/naresh_vijh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              }
            >
              <p className="hover:underline underline-offset-2">instagram</p>
            </Link>

            <Link target="_blank" href={"/about-us"}>
              <p className="hover:underline underline-offset-2">about us</p>
            </Link>

            <Link href={"/get-quote"}>
              <Button variant="link" size="sm" className="border-2 uppercase">
                Get Quote
              </Button>
            </Link>

            <Link
              href={
                session.status === "unauthenticated" ? "/sign-in" : "/settings"
              }
            >
              {session.status === "unauthenticated" ? (
                <Button variant="link" size="sm" className="border-2 uppercase">
                  Sign In
                </Button>
              ) : (
                <Button variant="link" size="sm" className="border-2 uppercase">
                  Profile
                </Button>
              )}
            </Link>

            {/* {navbarItems.map((navbarItem) => (
              <>
                {navbarItem.isButton ? (
                  <Link href={navbarItem.href}>
                    <Button
                      variant="link"
                      size="sm"
                      className="border-2 uppercase"
                    >
                      {navbarItem.label}
                    </Button>
                  </Link>
                ) : (
                  <Link href={navbarItem.href}>
                    <div className="hover:underline underline-offset-2">
                      {navbarItem.label}
                    </div>
                  </Link>
                )}
              </>
            ))} */}
          </div>
          <ModeToggle />
        </div>
      </nav>
    </>
  );
};
