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
        "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-neutral-900 border-r border-[#2D2E35] z-50 p-4 rounded-r-lg",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
