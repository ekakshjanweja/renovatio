import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DetailsTab } from "./_components/tabs/summary-tab";

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
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="bills">Bills</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <DetailsTab projectId={projectId} />
          </TabsContent>
          <TabsContent value="bills">Bills</TabsContent>
          <TabsContent value="settings">Settings</TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default UserProjectPage;
