"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@toolkit/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@toolkit/ui/sidebar";
import { Icons } from "@toolkit/ui/icons";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();

  return (
    <div className="flex items-center gap-2 p-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg ">
      <Icons.Logo className="size-8" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">org name</span>
        <span className="truncate text-xs">org plan</span>
      </div>
    </div>
  );
}
