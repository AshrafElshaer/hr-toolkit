"use client";

import { Label } from "@toolkit/ui/label";
import { Check, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@toolkit/ui/button";
import { cn } from "@toolkit/ui/cn";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@toolkit/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@toolkit/ui/popover";

export function TimezoneSelector({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const timezones = Intl.supportedValuesOf("timeZone");

  const formattedTimezones = useMemo(() => {
    return timezones
      .map((timezone) => {
        const formatter = new Intl.DateTimeFormat("en", {
          timeZone: timezone,
          timeZoneName: "shortOffset",
        });
        const parts = formatter.formatToParts(new Date());
        const offset =
          parts.find((part) => part.type === "timeZoneName")?.value || "";
        const modifiedOffset = offset === "GMT" ? "GMT+0" : offset;

        return {
          value: timezone,
          label: `(${modifiedOffset}) ${timezone.replace(/_/g, " ")}`,
          numericOffset: Number.parseInt(
            offset.replace("GMT", "").replace("+", "") || "0",
          ),
        };
      })
      .sort((a, b) => a.numericOffset - b.numericOffset);
  }, [timezones]);

  return (
    <div className="space-y-2">
      <Label htmlFor="select-43">Timezone</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="select-43"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background px-3 font-normal hover:bg-background"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? formattedTimezones.find(
                    (timezone) => timezone.value === value,
                  )?.label
                : "Select timezone"}
            </span>
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command
            filter={(value, search) => {
              const normalizedValue = value.toLowerCase();
              const normalizedSearch = search.toLowerCase().replace(/\s+/g, "");
              return normalizedValue.includes(normalizedSearch) ? 1 : 0;
            }}
          >
            <CommandInput placeholder="Search timezone..." />
            <CommandList>
              <CommandEmpty>No timezone found.</CommandEmpty>
              <CommandGroup>
                {formattedTimezones.map(({ value: itemValue, label }) => (
                  <CommandItem
                    key={itemValue}
                    value={itemValue}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === itemValue ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}