import Link from "next/link";

export const Logo = () => {
  return (
    <>
      <Link href={"/"}>
        <h1 className="uppercase tracking-widest text-xl font-semibold">
          renovatio
        </h1>
      </Link>
    </>
  );
};
