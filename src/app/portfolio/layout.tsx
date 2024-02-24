import { Navbar } from "@/components/navbar";

interface PortfolioLayoutProps {
  children: React.ReactNode;
}

const PortfolioLayout = ({ children }: PortfolioLayoutProps) => {
  return (
    <>
      <div className="p-2">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default PortfolioLayout;
