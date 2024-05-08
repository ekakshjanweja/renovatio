import { Navbar } from "@/components/navbar/index";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="p-2">{children}</div>
    </>
  );
};

export default DashboardLayout;
