"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Page() {
  const { user } = useUser();
  const pathname = usePathname();

  console.log(user);
  return (
    <div>
      <SignOutButton redirectUrl={`/auth?redirect_url=${pathname}`} />
    </div>
  );
}
