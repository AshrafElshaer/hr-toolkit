import { Card } from "@hr-toolkit/ui/card";
import { Skeleton } from "@hr-toolkit/ui/skeleton";

export function ClockInOutSkeleton() {
  return (
    <Card className=" ml-auto flex flex-col p-4 gap-4 w-full sm:w-80 h-fit ">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground/70 font-semibold">Clock In/Out</h3>
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-8 w-full " />
    </Card>
  );
}
