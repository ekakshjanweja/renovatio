import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectTab } from "./_components/projects/projects-tab";
import { SolaceTab } from "./_components/solace/solace-tab";
import { getAllProjectsForCurrentUser } from "@/actions/project-action";
import { Project } from "@/types/interfaces";
import { HistoryTab } from "./_components/history/history-tab";
import { getSolaceHistory } from "@/actions/solace-action";
import { getCurrentUser } from "@/actions/user-action";
import { Swappy } from "./_components/swappy";

const Dashboard = async () => {
  const session = await auth();
  const user = await getCurrentUser();

  if (!session) {
    notFound();
  }

  const projects: Project[] = await getAllProjectsForCurrentUser();

  const leonardoApiKey = process.env.LEONARDO_API_KEY!;

  const solaceHistory = await getSolaceHistory();

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <Tabs defaultValue="projects" className="w-full max-w-7xl">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="solace">Solace</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="swappy">swappy</TabsTrigger>
          </TabsList>
          <TabsContent value="projects">
            <ProjectTab />
          </TabsContent>
          <TabsContent value="solace" className="flex justify-center">
            <SolaceTab
              apiKey={leonardoApiKey}
              projects={projects}
              userId={user.id}
              remainingCredits={user.remaining}
            />
          </TabsContent>
          <TabsContent value="history" className="flex justify-center">
            <HistoryTab history={solaceHistory.history} />
          </TabsContent>
          <TabsContent value="swappy" className="flex justify-center">
            <Swappy />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Dashboard;
