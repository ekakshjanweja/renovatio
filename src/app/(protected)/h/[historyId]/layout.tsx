import { Navbar } from "@/components/navbar";

interface HistoryLayoutProps {
  children: React.ReactNode;
}

const HistoryLayout = ({ children }: HistoryLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="p-2">{children}</div>
    </>
  );
};

export default HistoryLayout;
