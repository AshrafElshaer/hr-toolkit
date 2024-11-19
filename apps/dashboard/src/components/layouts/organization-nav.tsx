"use client";

import { Button, buttonVariants } from "@toolkit/ui/button";
import { cn } from "@toolkit/ui/cn";
import {
  CreditCardIcon,
  Profile02Icon,
  SecurityLockIcon,
  Settings01Icon,
  UserMultiple02Icon,
} from "hugeicons-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const organizationNavItems = [
  {
    label: "Profile",
    href: "/organization",
    icon: <Profile02Icon strokeWidth={2} size={16} />,
  },
  {
    label: "Team",
    href: "/organization/team",
    icon: <UserMultiple02Icon strokeWidth={2} size={16} />,
  },
  {
    label: "Billing",
    href: "/organization/billing",
    icon: <CreditCardIcon strokeWidth={2} size={16} />,
  },

  {
    label: "Security",
    href: "/organization/security",
    icon: <SecurityLockIcon strokeWidth={2} size={16} />,
  },
];

export function OrganizationNav() {
  const pathname = usePathname();
  return (
    <nav className="w-full flex gap-2 overflow-x-scroll items-center scrollbar-hide">
      {organizationNavItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: cn(
                "gap-2",
                isActive &&
                  "border-b border-b-primary rounded-b-none px-0 text-foreground bg-accent",
              ),
            })}
            href={item.href}
            key={item.href}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
