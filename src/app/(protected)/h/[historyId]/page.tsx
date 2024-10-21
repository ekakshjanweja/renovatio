import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { getSolaceHistoryById } from "@/actions/solace-action";
import { HistoryCard } from "./_components/history-card";
import { SolaceSelect } from "@/db/schema/solace";

const HistoryPage = async ({ params }: { params: { historyId: string } }) => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const historyId = params.historyId;

  const item: SolaceSelect = await getSolaceHistoryById(historyId);

  return (
    <>
      <div className="max-w-7xl">
        <HistoryCard item={item} />
      </div>
    </>
  );
};

export default HistoryPage;
