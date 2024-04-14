"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const LogoutButton = async ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <>
      <Button
        onClick={() => signOut()}
        className={className}
        variant="secondary"
      >
        Logout
      </Button>
    </>
  );
};
