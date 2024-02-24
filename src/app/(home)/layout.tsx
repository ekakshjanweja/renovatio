import { Navbar } from "@/components/navbar";

interface HomePageLayoutProps {
  children: React.ReactNode;
}

const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  return (
    <>
      <div className="p-2">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default HomePageLayout;
