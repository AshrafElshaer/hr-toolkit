import { cn } from "@hr-toolkit/ui/utils";
import React, { type HtmlHTMLAttributes } from "react";

export default function Main({
  children,
  className,
  ...props
}: HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <main
      className={cn(
        " w-full md:w-[calc(100%_-_3.3rem)] h-[calc(100%_-_50px)] top-[50px] p-4 relative left-0 md:left-[3.3rem]",
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
}
