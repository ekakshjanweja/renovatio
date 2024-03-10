import { Loader } from "lucide-react";

export const Loading = () => {
  return (
    <>
      <main className="h-screen w-full relative touch-none flex items-center justify-center">
        <Loader className="h-8 w-8 text-muted-foreground animate-spin" />
      </main>
    </>
  );
};
