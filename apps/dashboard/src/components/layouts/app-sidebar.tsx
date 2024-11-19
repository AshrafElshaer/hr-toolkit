"use client";

import { Building2, Headset } from "lucide-react";
import type * as React from "react";

import { NavMain } from "@/components/layouts/nav-main";
import { OrganizationLogo } from "@/components/layouts/org-logo";

import { useCurrentUser } from "@/hooks/use-current-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@toolkit/ui/sidebar";
import {
  Calendar03Icon,
  ChartRoseIcon,
  Chatting01Icon,
  Files01Icon,
  Home01Icon,
  JobLinkIcon,
  UserSearch01Icon,
} from "hugeicons-react";

const links = [
  {
    title: "Dashboard",
    url: "/",
    icon: <Home01Icon strokeWidth={2} size={20} />,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: <Calendar03Icon strokeWidth={2} size={20} />,
  },
  {
    title: "Job Listings",
    url: "/job-listings",
    icon: <JobLinkIcon strokeWidth={2} size={20} />,
  },
  {
    title: "Candidates",
    url: "/candidates",
    icon: <UserSearch01Icon strokeWidth={2} size={20} />,
  },

  {
    title: "Reports",
    url: "/reports",
    icon: <ChartRoseIcon strokeWidth={2} size={20} />,
  },
  {
    title: "Interviews",
    url: "/interviews",
    icon: <Headset strokeWidth={2} size={20} />,
  },
  // {
  //   title: "Files",
  //   url: "/files",
  //   icon: <Files01Icon strokeWidth={2} size={20} />,
  // },
];
const communication = [
  {
    title: "Chat",
    url: "/chat",
    icon: <Chatting01Icon strokeWidth={2} size={20} />,
  },
];

const settings = [
  {
    title: "Organization",
    url: "/organization",
    icon: <Building2 strokeWidth={2} size={20} />,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useCurrentUser();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <OrganizationLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={links} label="Workspace" />
        <NavMain items={communication} label="Team" />
        {user?.user_role === "admin" ? (
          <NavMain items={settings} label="Settings" />
        ) : null}
      </SidebarContent>
      {/* <SidebarFooter></SidebarFooter> */}
    </Sidebar>
  );
}
