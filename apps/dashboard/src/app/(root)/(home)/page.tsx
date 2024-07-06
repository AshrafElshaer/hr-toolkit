import { Suspense } from "react";
import { Skeleton } from "@hr-toolkit/ui/skeleton";
import { Card } from "@hr-toolkit/ui/card";
import ClockInOut from "./_components/clock-in-out";
import { env } from "@hr-toolkit/env";
import UpcomingEvents from "./_components/events";
import WelcomeMessage from "./_components/welcome";
import { WelcomeMessageSkeleton } from "./_components/loading/welcome-message";
import { ClockInOutSkeleton } from "./_components/loading/clock-in-out";
import Main from "@/components/main";

export default async function IndexPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Main className="flex flex-col gap-4">
      <div className="flex gap-4 flex-col lg:flex-row">
        <Suspense fallback={<WelcomeMessageSkeleton />}>
          {env.NEXT_PUBLIC_NODE_ENV === "development" ? (
            <WelcomeMessageSkeleton />
          ) : (
            <WelcomeMessage />
          )}
        </Suspense>
        <Suspense fallback={<ClockInOutSkeleton />}>
          {env.NEXT_PUBLIC_NODE_ENV === "development" ? (
            // <ClockInOutSkeleton />
            <ClockInOut />
          ) : (
            <ClockInOut />
          )}
        </Suspense>
      </div>
      <UpcomingEvents searchParams={searchParams} />
      <div>
        <Card className="flex flex-col p-4 gap-4 w-full sm:w-80 h-fit ">
          <h3 className="text-foreground/70 font-semibold">Todo</h3>
          <Skeleton className="h-8 w-full " />
        </Card>
        <Card className="flex flex-col p-4 gap-4 w-full sm:w-80 h-fit ">
          <h3 className="text-foreground/70 font-semibold">Todo</h3>
          <Skeleton className="h-8 w-full " />
        </Card>
      </div>
    </Main>
  );
}
