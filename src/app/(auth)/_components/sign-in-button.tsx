"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const SignInButton = () => {
  const { data: sesssion } = useSession();

  if (!sesssion) {
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-y-4">
          <p>Not signed in</p>
          <Button size="sm" onClick={() => signIn()}>
            Sign In
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-4">
        <p>Signed in as {sesssion.user?.name}</p>
        <Button size="sm" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </>
  );
};

export default SignInButton;
