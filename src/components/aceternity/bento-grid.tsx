import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  href,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-stone-950 dark:border-stone-50/[0.2] bg-stone-50 border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className=" group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-bold text-stone-600 dark:text-stone-200">
          {title}
        </div>
        <div className="font-normal text-stone-600 text-xs dark:text-stone-300">
          {description}
        </div>
      </div>
    </Link>
  );
};
