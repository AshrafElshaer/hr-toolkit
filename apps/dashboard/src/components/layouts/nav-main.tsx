"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import { buttonVariants } from "@toolkit/ui/button";
import { cn } from "@toolkit/ui/cn";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@toolkit/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@toolkit/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
  label,
}: {
  items: {
    title: string;
    url: string;
    icon: React.ReactNode;
  }[];
  label: string;
}) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = item.url === pathname;
          return (
            <SidebarMenuButton
              asChild
              key={item.title}
              onClick={() => setOpenMobile(false)}
              className="!px-3"
            >
              <Link
                href={item.url}
                className={buttonVariants({
                  variant: isActive ? "secondary" : "ghost",
                  className: cn("!justify-start gap-2   relative font-semibold"),
                })}
              >
                {item.icon}
                {item.title}
                {isActive && (
                  <div className="absolute  w-1 bg-primary right-0 bottom-1 top-1 rounded-l-full" />
                )}
              </Link>
            </SidebarMenuButton>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
