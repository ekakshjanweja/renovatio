import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DetailsTab } from "./_components/tabs/details-tab";
import { BillsTab } from "./_components/tabs/bills-tab";
import { SettingsTab } from "./_components/tabs/settings-tab";

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
          <TabsContent value="bills">
            <BillsTab />
          </TabsContent>
          <TabsContent value="settings">
            <SettingsTab projectId={projectId} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default UserProjectPage;
