import { Navbar } from "@/components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <div className="p-0">
        <Navbar />
        <div className="flex h-full pt-2">
          <Sidebar />
          <Container> {children}</Container>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
