import { auth } from "@/auth";
import { getCurrentUser } from "@/actions/user-action";
import { notFound } from "next/navigation";
import { CreateProjectForm } from "./_components/create-project/create-project-form";

const CreateProject = async () => {
  const session = await auth();

  if (!session) {
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
