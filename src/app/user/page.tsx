import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getAllProjectsForCurrentUser } from "@/services/project-service";
import Link from "next/link";
import { notFound } from "next/navigation";

const UserPage = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const projects = await getAllProjectsForCurrentUser();

  return (
    <>
      <div className="flex gap-6">
        {projects.map((project) => (
          <>
            <div>
              <Link href={`/user/${project.id}`}>
                <Button variant={"link"}>{project.name}</Button>
              </Link>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default UserPage;
