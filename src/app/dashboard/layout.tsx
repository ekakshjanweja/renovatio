import { Navbar } from "@/components/navbar";
import { getCurrentUser } from "@/services/user-service";
import { getSession, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

const DashboardLayout = async ({ params, children }: DashboardLayoutProps) => {
  const user = await getCurrentUser();

//   const session = getSession();
// session
//   if (session.status === "unauthenticated" || session.status === "loading") {
//     return redirect("/sign-in");
//   }

  if (!user) {
    return <>Invalid</>;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
