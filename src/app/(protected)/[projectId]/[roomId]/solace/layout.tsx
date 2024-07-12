import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";

// export const metadata: Metadata = {
//   title: "Next.js + Replicate + Typescript",
//   description: "Replicate Typescript Starter",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
