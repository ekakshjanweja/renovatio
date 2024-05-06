import { auth } from "@/auth";
import { getCurrentUser } from "@/services/user-service";
import { notFound } from "next/navigation";

const CreateProject = async () => {
  const session = await auth();

  const user = await getCurrentUser();

  if (!session || !user.isDesigner) {
    notFound();
  }

  return (
    <>
      <div>Create Project</div>
    </>
  );
};

export default CreateProject;
