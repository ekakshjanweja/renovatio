import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { CreateProjectForm } from "./_components/create-project/create-project-form";
import { getCurrentUser } from "@/services/user-service";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const user = await getCurrentUser();

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-6">
        {user.isDesigner && <CreateProjectForm />}
      </div>
    </>
  );
};

export default DashboardPage;
