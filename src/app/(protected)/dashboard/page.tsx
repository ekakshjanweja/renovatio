import { auth } from "@/auth";
import { Input } from "@/components/ui/input";
import db from "@/db";
import { projects } from "@/db/schema/projects";
import { notFound } from "next/navigation";
import { CreateProjectForm } from "./_components/create-project/create-project-form";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-y-6">
        {/* <p>Create Project</p>
        <Input type="text" placeholder="Name" />
        <Input type="text" placeholder="Location" />
        <Input type="number" placeholder="Area" />
        <Input type="text" placeholder="Category" />
        <Input type="text" placeholder="Description" /> */}
        <CreateProjectForm />
      </div>
    </>
  );
};

export default DashboardPage;
