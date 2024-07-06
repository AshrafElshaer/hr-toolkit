import { Card } from "@hr-toolkit/ui/card";
import { Skeleton } from "@hr-toolkit/ui/skeleton";
import React from "react";

export default function HoursBreakdownLoading() {
  return (
    <Card className="px-4 py-2 w-full  flex flex-col items-start sm:flex-row sm:items-center sm:gap-20 justify-between ">
      <div className="flex items-center justify-between w-full sm:w-1/2">
        <div>
          <span className="text-sm text-muted-foreground ">Work Schedule</span>
          <Skeleton className="w-20 h-4 mt-1" />
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Logged Time</span>
          <Skeleton className="w-20 h-4 mt-1" />
        </div>
      </div>

      <div>
        <span className="text-sm text-muted-foreground">Overtime</span>
        <Skeleton className="w-20 h-4 mt-1" />
      </div>
    </Card>
  );
}
