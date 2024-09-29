import { Navbar } from "@/components/navbar/index";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="mx-4 sm:mx-2 md:mx-0 p-2">{children}</div>
    </>
  );
};

export default DashboardLayout;
