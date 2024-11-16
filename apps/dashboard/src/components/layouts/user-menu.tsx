"use client";

import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@toolkit/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@toolkit/ui/dropdown-menu";
import { Skeleton } from "@toolkit/ui/skeleton";
import React from "react";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSupabase } from "@/hooks/use-supabase";
// import { ThemeToggle } from "@/components/theme-toggle";
import type { User } from "@toolkit/supabase/types";
import { Door01Icon } from "hugeicons-react";
import { LogOutIcon, MessageSquarePlus, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { MdSupportAgent } from "react-icons/md";
// import { ThemeToggle } from "../theme-toggle";

export default function UserMenu() {
  const supabase = useSupabase();
  const router = useRouter();
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Skeleton className="w-10 h-10 rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="overflow-hidden rounded-full ">
        <span className="sr-only">User menu</span>
        {isLoading ? (
          <Skeleton className="w-10 h-10 rounded-full" />
        ) : (
          <Avatar
            shape="circle"
            size="medium"
            src={currentUser?.avatar_url ?? ""}
            initials={
              currentUser?.avatar_url
                ? undefined
                : `${currentUser?.first_name[0]}${currentUser?.last_name[0]}`
            }
          />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={14}
        className="right-12 w-60"
        align="end"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <button
            type="button"
            className="flex w-full items-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            <MdSupportAgent className="h-4 w-4" />
            <span>Support</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            type="button"
            className="flex w-full items-center space-x-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            disabled
          >
            <BiMessageRoundedAdd className="h-4 w-4" />
            <span>Feedback</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Settings className="h-4 w-4" />
            <span>Setting</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ThemeToggle />
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            type="button"
            className="flex w-full items-center space-x-2 px-2  cursor-pointer"
            onClick={() =>
              supabase.auth.signOut().then(() => {
                router.push("/auth");
              })
            }
          >
            <Door01Icon strokeWidth={2} className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { RadioGroup, RadioGroupItem } from "@toolkit/ui/radio-group";
import { Check, Minus } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import UiDark from "../../../public/ui-dark.png";
import UiLight from "../../../public/ui-light.png";
import UiSystem from "../../../public/ui-system.png";

const items = [
  { id: "radio-18-r1", value: "light", label: "Light", image: UiLight },
  { id: "radio-18-r2", value: "dark", label: "Dark", image: UiDark },
  { id: "radio-18-r3", value: "system", label: "System", image: UiSystem },
];

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <fieldset className="space-y-4">
      {/* <legend className="text-sm font-medium leading-none text-foreground">
        Choose a theme
      </legend> */}
      <RadioGroup
        className="flex gap-3"
        defaultValue={isDark ? "dark" : "light"}
        onValueChange={(value) => setTheme(value)}
      >
        {items.map((item) => (
          <label key={item.id}>
            <RadioGroupItem
              id={item.id}
              value={item.value}
              className="peer sr-only after:absolute after:inset-0"
            />
            <Image
              src={item.image.src}
              alt={item.label}
              width={78}
              height={60}
              className="relative cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 ring-offset-background transition-colors peer-[:focus-visible]:ring-2 peer-[:focus-visible]:ring-ring/70 peer-[:focus-visible]:ring-offset-2 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent peer-data-[disabled]:opacity-50"
            />
            <span className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
              <Check
                size={16}
                strokeWidth={2}
                className="peer-data-[state=unchecked]:group-[]:hidden"
                aria-hidden="true"
              />
              <Minus
                size={16}
                strokeWidth={2}
                className="peer-data-[state=checked]:group-[]:hidden"
                aria-hidden="true"
              />
              <span className="text-xs font-medium">{item.label}</span>
            </span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
