import { Card } from "@hr-toolkit/ui/card";
import { Skeleton } from "@hr-toolkit/ui/skeleton";

export function InfoLoading() {
  return (
    <Card className="px-4 py-2 w-full  flex flex-col items-start sm:flex-row sm:items-center sm:gap-20 justify-between ">
      <div className="flex items-center justify-between w-full">
        <div>
          <span className="text-sm text-muted-foreground ml-10">Employee</span>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 cursor-pointer rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Job Title</span>
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="flex items-start justify-between w-full">
        <div>
          <span className="text-sm text-muted-foreground">Department</span>
          <div className="flex gap-2 items-center">
            <Skeleton className="h-4 w-12" /> -{" "}
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div>
          <span className="text-sm text-muted-foreground">Status</span>
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </Card>
  );
}
