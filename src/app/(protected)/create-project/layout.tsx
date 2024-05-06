import { Navbar } from "@/components/navbar/index";

interface CreateProjectLayoutProps {
  children: React.ReactNode;
}

const CreateProjectLayout = ({ children }: CreateProjectLayoutProps) => {
  return (
    <>
      <div className="p-2">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default CreateProjectLayout;
