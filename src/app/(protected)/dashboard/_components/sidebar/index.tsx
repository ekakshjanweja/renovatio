"use client";

import { Button } from "@/components/ui/button";
import { Wrapper } from "./wrapper";
import { useSidebar } from "@/lib/store/use-sidebar";
import { cn } from "@/lib/utils";
import { PanelLeftCloseIcon, PanelRightOpenIcon } from "lucide-react";

export const Sidebar = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);
  return (
    <>
      <Wrapper>
        <div
          className={cn(
            "",
            collapsed
              ? "flex flex-col items-center justify-between"
              : "flex items-center justify-between"
          )}
        >
          {collapsed ? (
            <Button variant="ghost" className="p-0" onClick={onExpand}>
              <PanelRightOpenIcon className="text-muted-foreground h-4 w-4 hover:text-foreground transition duration-150" />
            </Button>
          ) : (
            <Button variant="ghost" className="p-0" onClick={onCollapse}>
              <PanelLeftCloseIcon className="text-muted-foreground h-4 w-4 hover:text-foreground transition duration-150" />
            </Button>
          )}
        </div>
        <p>Test 1</p>
        <div>Test 2</div>
      </Wrapper>
    </>
  );
};
