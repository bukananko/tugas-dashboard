import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse bg-slate-200 dark:bg-slate-800 w-full h-3 rounded-md",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
