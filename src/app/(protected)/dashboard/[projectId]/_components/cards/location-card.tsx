import { ArrowRight, Landmark } from "lucide-react";
import { ProjectDetailsCardWrapper } from "../project-details-card";
import { Button } from "@/components/ui/button";

interface LocationCardProps {
  isSmall: boolean;
  projectLocation: string;
  landmark?: string;
}

export const LocationCard = ({
  isSmall,
  projectLocation,
  landmark,
}: LocationCardProps) => {
  if (isSmall) {
    return (
      <>
        <ProjectDetailsCardWrapper
          isSmall
          className="p-4 flex flex-col justify-between"
        >
          <div>
            <p className="text-xl font-semibold text-foreground">
              {projectLocation}
            </p>
            <p className="text-base text-muted-foreground">Location</p>
          </div>
          <Button
            variant={"outline"}
            className="flex text-muted-foreground items-center justify-center border border-muted-foreground w-2/5 p-2 rounded-full text-sm overflow-hidden"
          >
            <Landmark className="h-4 w-4 mr-2" />
            <p className="text-lime-500">{landmark?.substring(0, 10)}</p>
          </Button>
        </ProjectDetailsCardWrapper>
      </>
    );
  } else {
    return (
      <>
        <ProjectDetailsCardWrapper className="p-4 flex flex-col justify-between lg:hidden">
          <div>
            <p className="text-xl font-semibold text-foreground">
              {projectLocation}
            </p>
            <p className="text-base text-muted-foreground">Location</p>
          </div>
          <Button
            variant={"outline"}
            className="flex text-muted-foreground items-center justify-center border border-muted-foreground w-1/3 p-1 rounded-full text-sm overflow-auto"
          >
            <Landmark className="h-4 w-4 mr-2" />
            <p className="text-lime-500">{landmark?.substring(0, 10)}</p>
          </Button>
        </ProjectDetailsCardWrapper>
      </>
    );
  }
};
