"use client";

import Link from "next/link";
import Image from "next/image";
import LogoBlack from "../../public/images/logo_black.svg";
import LogoWhite from "../../public/images/logo_white.svg";
import { useTheme } from "next-themes";

export const Logo = () => {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <>
      <Link href={"/"}>
        {/* <Image alt="" src={isDark ? LogoWhite : LogoBlack} className="w-52" /> */}

        <h1 className="text-2xl hover:text-foreground">renovatio</h1>
      </Link>
    </>
  );
};
