"use client";

import { useSidebar } from "@/lib/store/use-sidebar";
import { cn } from "@/lib/utils";
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  return (
    <>
      <div
        className={cn(
          "",
          collapsed
            ? "flex flex-col items-center justify-end"
            : "flex items-center justify-end"
        )}
      >
        {collapsed ? (
          <Button variant="ghost" className="p-0" onClick={onExpand}>
            <SidebarOpenIcon className="text-muted-foreground h-4 w-4 hover:text-foreground transition duration-150" />
          </Button>
        ) : (
          <Button variant="ghost" className="p-0" onClick={onCollapse}>
            <SidebarCloseIcon className="text-muted-foreground h-4 w-4 hover:text-foreground transition duration-150" />
          </Button>
        )}
      </div>
    </>
  );
};
