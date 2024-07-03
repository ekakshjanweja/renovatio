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
import { usePathname } from "next/navigation";

interface CreateProjectCardWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const CreateProjectCardWrapper = ({
  title,
  description,
  children,
}: CreateProjectCardWrapperProps) => {
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
      </Card>
    </>
  );
};
