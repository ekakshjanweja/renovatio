import { cn } from "@/lib/utils";

interface ProjectDetailsCardWrapperProps {
  children: React.ReactNode;
  isSmall?: boolean;
  className?: string;
}

export const ProjectDetailsCardWrapper = ({
  children,
  isSmall,
  className,
}: ProjectDetailsCardWrapperProps) => {
  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-muted-foreground",
          isSmall
            ? "h-[350px] lg:h-[130px] xl:h-[150px]"
            : "h-[350px] lg:h-[450px] xl:h-[500px]",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};
