import { Input } from "@/components/ui/input";

const LandingPage = () => {
  return (
    <>
      <div className="p-6 flex flex-col items-center justify-center h-[calc(100vh-45px)]">
        <p className="text-3xl font-medium mb-4 ">
          The easiest way to interact with clients for interior designers
        </p>
        <p className="mb-16">
          Manage projects, share updates with clients and use ai image
          generation for snappy changes
        </p>

        <div className="">
          <Input placeholder="Join waitlist" />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
