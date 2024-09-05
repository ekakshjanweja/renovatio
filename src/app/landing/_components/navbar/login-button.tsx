"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="rounded-full bg-custom hover:bg-custom"
    >
      Login
    </Button>
  );
};

export default LoginButton;
