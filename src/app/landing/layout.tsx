import { Navbar } from "./_components/navbar";

const Landing = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex justify-center px-4 md:px-0">
        <div className=" md:max-w-screen-xl">
          <Navbar />
          {children}
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default Landing;
