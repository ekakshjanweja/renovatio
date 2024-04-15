import { auth } from "@/auth";
import { notFound } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  return <>Dashboard</>;
};

export default DashboardPage;
