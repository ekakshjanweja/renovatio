import { Navbar } from "@/components/navbar/index";

interface ProjectPageLayoutProps {
  children: React.ReactNode;
}

const ProjectPageLayout = ({ children }: ProjectPageLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="p-2">{children}</div>
    </>
  );
};

export default ProjectPageLayout;
