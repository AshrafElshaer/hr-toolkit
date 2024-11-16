import { SidebarInset, SidebarTrigger } from "@toolkit/ui/sidebar";

import { AppSidebar } from "@/components/layouts/app-sidebar";

import { AppHeader } from "@/components/layouts/app-header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@toolkit/ui/breadcrumb";
import { Separator } from "@toolkit/ui/separator";
import { SidebarProvider } from "@toolkit/ui/sidebar";
import { Bell } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  // This is where your authenticated app lives, add a sidebar, header etc.
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-4 overflow-x-hidden">
        <AppHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
