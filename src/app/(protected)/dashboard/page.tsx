import { auth } from "@/auth";
import { getAllProjectsForCurrentUser } from "@/services/project-service";
import { notFound } from "next/navigation";
import { ProjectCard } from "./_components/projects/project-card";
import { setUserDesigner } from "@/actions/user-action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectTab } from "./_components/projects/projects-tab";
import { SolaceTab } from "./_components/solace/solace-tab";

const Dashboard = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const projects = await getAllProjectsForCurrentUser();

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <Tabs defaultValue="projects" className="w-full max-w-7xl">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="solace">Solace</TabsTrigger>
          </TabsList>
          <TabsContent value="projects">
            <ProjectTab />
          </TabsContent>
          <TabsContent value="solace">
            <SolaceTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Dashboard;
