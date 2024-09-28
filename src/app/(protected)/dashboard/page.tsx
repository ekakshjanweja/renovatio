import { auth } from "@/auth";
import { getAllProjectsForCurrentUser } from "@/services/project-service";
import { notFound } from "next/navigation";
import { ProjectCard } from "./_components/project-card";
import { setUserDesigner } from "@/actions/user-action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectTab } from "./_components/projects/projects-tab";

const Dashboard = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const projects = await getAllProjectsForCurrentUser();

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <Tabs defaultValue="solace" className="max-w-7xl">
          <TabsList>
            <TabsTrigger value="solace">Solace</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="solace">
            <div className="p-0 mt-4">
              <h1 className="text-3xl pb-4">Your Projects</h1>
              <div className="grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-full mx-auto ">
                {projects.map((project) => (
                  <>
                    <ProjectCard project={project} key={project.id} />
                  </>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="projects">
            <ProjectTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Dashboard;
