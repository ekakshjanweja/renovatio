import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SolaceEditor",
  description: "Editor for solace generated images.",
};

const SolaceEditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default SolaceEditorLayout;
