import { Navbar } from "@/components/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <div className="p-0">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
