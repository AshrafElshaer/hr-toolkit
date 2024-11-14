import * as React from "react";
import { cn } from "../utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, error, ...props }, ref) => {
    const [isActive, setIsActive] = React.useState(false);
    return (
      <div className="space-y-2">
        <div
          className={cn(
            "relative flex items-center w-full border  rounded-md px-2",
            startIcon ? "pl-10" : "",
            endIcon ? "pr-10" : "",
            isActive ? "border-secondary-foreground" : "border-border",
            error ? "border-destructive" : "",
            className,
          )}
        >
          {startIcon && (
            <div
              className={cn(
                "absolute left-3 flex items-center pointer-events-none ",
                isActive
                  ? "text-secondary-foreground"
                  : "text-muted-foreground",
                error ? "text-destructive" : "",
              )}
            >
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex  w-full border-none bg-background text-base sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              "py-2",
            )}
            ref={ref}
            {...props}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
          />
          {endIcon && (
            <div
              className={cn(
                "absolute right-3 flex items-center pointer-events-none ",
                isActive ? "text-foreground" : "text-muted-foreground",
                error ? "text-destructive" : "",
              )}
            >
              {endIcon}
            </div>
          )}
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

interface UrlInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

function UrlInput({ error, ...props }: UrlInputProps) {
  return (
    <div className="relative">
      <Input {...props} className="peer ps-16" type="text" error={error} />
      <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-secondary-foreground peer-disabled:opacity-50">
        https://
      </span>
    </div>
  );
}
export { Input, UrlInput };
