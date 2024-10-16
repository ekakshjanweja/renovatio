"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

export const AddProjectButtonn = () => {
  const router = useRouter();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            aria-label="Create new project"
            onClick={() => router.push("/create-project")}
          >
            <Plus className="h-4 w-4" />
            <span>Project</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create new project</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
