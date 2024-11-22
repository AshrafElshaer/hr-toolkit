"use client";

import { Button } from "@toolkit/ui/button";
import { UserIcon } from "hugeicons-react";

export function InviteTeamMember() {
  return (
    <Button className="w-fit ml-auto" variant="secondary">
      <UserIcon className="w-4 h-4 mr-2" strokeWidth={2} />
      Invite
    </Button>
  );
}
