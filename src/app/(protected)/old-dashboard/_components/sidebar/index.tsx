import { Button } from "@/components/ui/button";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";

export const Sidebar = () => {
  return (
    <>
      <Wrapper>
        <Toggle />
        <div className="flex flex-col items-start justify-start">
          <p className="text-xl text-muted-foreground">Project Name</p>
          <Button variant="link" className="p-0">
            Images
          </Button>
          <Button variant="link" className="p-0">
            Status
          </Button>
          <Button variant="link" className="p-0">
            Bills
          </Button>
        </div>
      </Wrapper>
    </>
  );
};
