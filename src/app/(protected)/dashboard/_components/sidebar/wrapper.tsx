"use client";

import { useSidebar } from "@/lib/store/use-sidebar";
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebar((state) => state);

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-[70px] lg:w-52 h-full bg-neutral-100 dark:bg-neutral-900 z-50 p-4 rounded-r-lg",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
