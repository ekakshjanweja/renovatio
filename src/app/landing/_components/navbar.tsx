import Link from "next/link";

export const LandingNavbar = () => {
  return (
    <>
      <nav className="p-2 rounded-md flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-lg font-semibold mr-4">renovatio</h1>
        </Link>
        <div className="flex items-center gap-x-4">Try Now</div>
      </nav>
    </>
  );
};
