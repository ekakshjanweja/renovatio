import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectTab } from "./_components/projects/projects-tab";
import { SolaceTab } from "./_components/solace/solace-tab";
import { getAllProjectsForCurrentUser } from "@/actions/project-action";
import { Project } from "@/types/interfaces";

const Dashboard = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const projects: Project[] = await getAllProjectsForCurrentUser();

  const leonardoApiKey = process.env.LEONARDO_API_KEY!;

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
          <TabsContent value="solace" className="flex justify-center">
            <SolaceTab apiKey={leonardoApiKey} projects={projects} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Dashboard;
