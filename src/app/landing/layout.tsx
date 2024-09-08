import { Navbar } from "./_components/navbar";

const Landing = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="px-4 md:px-4">
        <Navbar />
        {children}
        <Navbar />
      </div>
    </>
  );
};

export default Landing;
