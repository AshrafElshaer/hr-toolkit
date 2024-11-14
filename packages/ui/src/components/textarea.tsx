import * as React from "react";

import { cn } from "../utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border  bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

interface TextareaWithErrorProps extends TextareaProps {
  error?: string;
}

const TextareaWithError = React.forwardRef<
  HTMLTextAreaElement,
  TextareaWithErrorProps
>(({ error, className, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <Textarea
        ref={ref}
        className={cn(
          error &&
            "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30",
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-destructive" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
});
TextareaWithError.displayName = "TextareaWithError";

export { Textarea, TextareaWithError };
