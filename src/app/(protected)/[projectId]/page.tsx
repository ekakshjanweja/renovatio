import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SolaceTab from "./_components/tabs/solace-tab";
import { DetailsTab } from "./_components/tabs/details-tab";
import { BillsTab } from "./_components/tabs/bills-tab";
import { SettingsTab } from "./_components/tabs/settings-tab";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { getCurrentUser, setUserDesigner } from "@/actions/user-action";
//import { db } from "@/db/index"
import db from "@/db/index";
import { users } from "@/db/schema/users";

interface UserProjectPageProps {
  params: { projectId: string };
}

const UserProjectPage = async ({ params }: UserProjectPageProps) => {
  const session = await auth();

  const user = await getCurrentUser();

  if (!session) {
    //|| !user.isDesigner) {
    notFound();
  }

  const projectId = params.projectId;

  return (
    <>
      <div className="p-2">
        <Tabs defaultValue="solace" className="w-full">
          <TabsList>
            <TabsTrigger value="solace">Solace</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="bills">Bills</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="solace">
            <SolaceTab />
          </TabsContent>
          <TabsContent value="details">
            <DetailsTab projectId={projectId} />
          </TabsContent>
          <TabsContent value="bills">
            <BillsTab projectId={projectId} />
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
