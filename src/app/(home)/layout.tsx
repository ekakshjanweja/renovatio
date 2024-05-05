import { Navbar } from "@/components/navbar/index";

interface HomePageLayoutProps {
  children: React.ReactNode;
}

const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  return (
    <>
      <div className="p-0">
        <Navbar />
        {children}
        <Navbar />
      </div>
    </>
  );
};

export default HomePageLayout;
