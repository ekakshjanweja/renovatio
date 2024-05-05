import { Navbar } from "@/components/navbar/index";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <div className="p-2">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
