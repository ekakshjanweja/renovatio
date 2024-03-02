"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { useWindowSize } from "@/lib/windows-size";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu, X } from "lucide-react";

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
  return (
    <>
      <nav className="h-10 flex items-center justify-between text-muted-foreground">
        <Logo />
        <div className="flex items-center justify-end gap-x-8">
          <div className="flex items-center justify-start gap-x-4">
            {navbarItems.map((navbarItem) => (
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
            ))}
          </div>
          <ModeToggle />
        </div>
      </nav>
    </>
  );
};
