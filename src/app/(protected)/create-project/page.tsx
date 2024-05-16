import { auth } from "@/auth";
import { getCurrentUser } from "@/services/user-service";
import { notFound } from "next/navigation";
import { CreateProjectForm } from "./_components/create-project/create-project-form";

const CreateProject = async () => {
  const session = await auth();

  const user = await getCurrentUser();

  if (!session || !user.isDesigner) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center justify-center pt-16">
        <CreateProjectForm />
      </div>
    </>
  );
};

export default CreateProject;
