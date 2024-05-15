import { getProjectById } from "@/services/project-service";
import { AutoScrollCarousel } from "./_components/auto-scroll-carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DesignerDetailsCard } from "./_components/cards/designer-details";
import { ProjectDetailsCard } from "./_components/cards/project-details-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SummaryTab } from "./_components/tabs/summary-tab";

interface UserProjectPageProps {
  params: {
    projectId: string;
  };
}

const UserProjectPage = async ({ params }: UserProjectPageProps) => {
  const projectId = params.projectId;

  return (
    <>
      <div className="p-2">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="3d">3D Renders</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="bills">Bills</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <SummaryTab projectId={projectId} />
          </TabsContent>
          <TabsContent value="plans">Plans</TabsContent>
          <TabsContent value="3d">3D Renders</TabsContent>
          <TabsContent value="materials">Materials</TabsContent>
          <TabsContent value="bills">Bills</TabsContent>
          <TabsContent value="settings">Settings</TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default UserProjectPage;
