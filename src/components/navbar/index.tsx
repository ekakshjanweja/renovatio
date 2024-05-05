"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavbarDropdownMenu } from "./nav-dropdown";
import { useSession } from "next-auth/react";

export const Navbar = () => {
  const session = useSession();

  return (
    <>
      <nav className="p-2 rounded-md flex justify-between items-center">
        <h1 className="text-lg font-semibold mr-4">renovatio</h1>
        <div className="flex items-center gap-x-4">
          <div className="hidden md:flex">instagram</div>
          <div className="hidden md:flex">about us</div>

          <Link href={"/get-quote"} className="">
            <Button variant="link" size="sm" className="border-2 uppercase">
              Get Quote
            </Button>
          </Link>

          <div className="hidden md:flex">
            {session.status === "unauthenticated" ? (
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
          <div className="flex md:hidden">
            <NavbarDropdownMenu />
          </div>
          <ModeToggle />
        </div>
      </nav>
    </>
  );
};

// <nav className="bg-black text-white py-4 px-8 flex justify-between items-center">
//         <div className="flex items-center">
//           <div className="text-lg font-bold mr-4">Renovatio</div>
//         </div>
//         <div className="flex items-center">
//           <div className="hidden md:flex mr-4">Instagram</div>
//           <div className="hidden md:flex mr-4">About Us</div>
//           <button className="bg-gray-800 text-white px-4 py-2 rounded-md mr-4">
//             Get Quote
//           </button>
//           <button className="bg-gray-800 text-white px-4 py-2 rounded-md mr-4">
//             Login
//           </button>
//           <button className="bg-gray-800 text-white px-4 py-2 rounded-md mr-4">
//             Signup
//           </button>
//         </div>
//       </nav>
