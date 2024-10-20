import { SolaceSelect } from "@/db/schema/solace";
import { HistoryCard } from "./history-card";

interface HistoryTabProps {
  history: SolaceSelect[];
}

export const HistoryTab = ({ history }: HistoryTabProps) => {
  return (
    <>
      <div className="p-0 mt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl pb-2 font-semibold">Solace History</h1>
            <p className="pb-4">Look at images you generated in the past</p>
          </div>
        </div>
        <div className="grid md:auto-rows-[24rem] grid-cols-1 md:grid-cols-3 lg:grid-cols-4 max-w-full mx-auto gap-6">
          {history.reverse().map((item) => (
            <>
              <HistoryCard item={item} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};
