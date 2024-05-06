import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getAllProjectsForCurrentUser } from "@/services/project-service";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CreateProjectForm } from "./_components/create-project/create-project-form";

const Dashboard = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const projects = await getAllProjectsForCurrentUser();

  return (
    <>
      <div className="p-6">
        <CreateProjectForm />
        <h1 className="text-xl">Your Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 justify-items-center">
          {projects.map((project) => (
            <>
              <div key={project.id}>
                <Link href={`/dashboard/${project.id}`}>
                  <div className="m-4 bg-neutral-950 hover:bg-stone-900 w-[200px] h-[300px] rounded-md ">
                    <Image
                      className="rounded-t-md"
                      src={project.thumbnailUrl!}
                      alt="Thumbnail"
                      width={200}
                      height={200}
                    />
                    <Button variant={"link"}>{project.name}</Button>
                  </div>
                </Link>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
