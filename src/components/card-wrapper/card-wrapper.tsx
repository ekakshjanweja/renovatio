"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { signIn } from "next-auth/react";
import GoogleLogo from "../../../public/logos/google-logo";
import { usePathname } from "next/navigation";
import { LogoutButton } from "../auth/logout-button";

interface CardWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const CardWrapper = ({
  title,
  description,
  children,
}: CardWrapperProps) => {
  const pathname = usePathname();

  const isSignIn = pathname === "/sign-in";

  const isProfile = pathname === "/settings";

  return (
    <>
      <Card className="w-[350px] md:w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{title}</CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>

        <CardContent>
          <div className="flex items-center justify-center">
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              <Button
                variant="link"
                size="sm"
                className=" text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition duration-200"
              >
                {isSignIn
                  ? " Dont have an account? Sign up."
                  : "Already have an account? Sign in."}
              </Button>
            </Link>
          </div>

          <Separator className="mt-4" />
          <div className="text-xs text-muted-foreground flex items-center justify-center mt-2">
            OR
          </div>

          <div className="flex items-center justify-center mt-4">
            {isProfile ? (
              <LogoutButton />
            ) : (
              <Button
                variant="outline"
                onClick={() => signIn("google")}
                className="gap-x-4"
              >
                <GoogleLogo />
                Login Using Google
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
