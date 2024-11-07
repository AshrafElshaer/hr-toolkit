"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Page() {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <SignOutButton redirectUrl={`/auth?redirect_url=${pathname}`} />
    </div>
  );
}
