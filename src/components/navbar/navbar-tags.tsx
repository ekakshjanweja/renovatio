"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarTags = () => {
  const pathname = usePathname();

  const isDashboard = pathname === "/dashboard";

  return (
    <>
      {isDashboard ? (
        <>
          <Link href={"/landing"}>
            <p>home</p>
          </Link>
        </>
      ) : (
        <>
          <Link href={"/dashboard"}>
            <p>dashboard</p>
          </Link>
        </>
      )}
    </>
  );
};

export default NavbarTags;
