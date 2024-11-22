// import { SettingsSidebar } from "@/components/organization-settings/sidebar";
import { OrganizationNav } from "@/components/layouts/organization-nav";
import { buttonVariants } from "@toolkit/ui/button";
import Link from "next/link";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 w-full flex-grow">
      <OrganizationNav />
      {children}
    </div>
  );
}
