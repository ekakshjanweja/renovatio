import { Navbar } from "@/components/navbar/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renovatio Editor",
  description: "Editor for solace generated images.",
};

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default EditorLayout;
