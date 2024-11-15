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
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-full">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
