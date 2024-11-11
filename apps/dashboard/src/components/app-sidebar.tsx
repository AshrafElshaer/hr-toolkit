"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Building2,
  Command,
  Frame,
  GalleryVerticalEnd,
  Headset,
  MapIcon,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import type * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { useUser } from "@clerk/nextjs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: MapIcon,
    },
  ],
};
// "dashboard , candidates, job listings, calendar, reports ,files"
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
    title: "Files",
    url: "/files",
    icon: <Files01Icon strokeWidth={2} size={20} />,
  },
];
const communication = [
  {
    title: "Chat",
    url: "/chat",
    icon: <Chatting01Icon strokeWidth={2} size={20} />,
  },
  {
    title: "Interviews",
    url: "/interviews",
    icon: <Headset strokeWidth={2} size={20} />,
  },
];

const settings = [
  {
    title: "Organization",
    url: "/organization",
    icon: <Building2 strokeWidth={2} size={20} />,
  },
  // {
  //   title: "Settings",
  //   url: "/settings",
  //   icon: <Settings strokeWidth={2} size={20} />,
  // },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={links} label="Workspace" />
        <NavMain items={communication} label="Communication" />
        <NavMain items={settings} label="Settings" />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.fullName ?? "",
            email: user?.emailAddresses[0]?.emailAddress ?? "",
            avatar: user?.imageUrl ?? "",
          }}
        />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
