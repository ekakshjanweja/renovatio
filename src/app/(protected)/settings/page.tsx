import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { UserAvatar } from "@/components/user-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/actions/user-action";

import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SettingsPage = async () => {
  const user = await getCurrentUser();

  const session = await auth();

  if (!session) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <Card className="w-[350px] md:w-[450px]">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-x-4">
                <UserAvatar classname="" />
                <p className="text-2xl">{user.name}</p>
              </div>
            </CardTitle>
            <CardDescription className="text-center"></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-4">
              <p>{user.id}</p>
              <Link href={"/dashboard"}>
                <Button variant="outline">Go to Dashboard</Button>
              </Link>
            </div>
          </CardContent>

          <CardContent>
            <div className="flex items-center justify-center"></div>

            <Separator className="mt-4" />

            <div className="flex items-center justify-center mt-4">
              <LogoutButton className="w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SettingsPage;
