"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { OrganizationMemberWithUser, User } from "@toolkit/supabase/types";
import { Button } from "@toolkit/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@toolkit/ui/dropdown-menu";
import { Edit01Icon } from "hugeicons-react";
import { MoreHorizontal, Trash } from "lucide-react";
import moment from "moment";
import DeleteUser from "./delete-user";
import { UpdateUser } from "./update-user";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
export const columns: ColumnDef<OrganizationMemberWithUser>[] = [
  {
    id: "name",
    accessorFn: (row) =>
      `${row.users?.first_name ?? ""} ${row.users?.last_name ?? ""}`,
    header: () => <div className="font-semibold min-w-28">Name</div>,
  },
  {
    id: "email",
    accessorFn: (row) => row.users?.email ?? "",
    header: "Email",
  },
  {
    accessorFn: (row) => row.users?.user_role ?? "",
    header: "Role",
    cell: ({ row }) => {
      return (
        <span className="capitalize">{row.original.users?.user_role}</span>
      );
    },
  },
  {
    id: "timezone",
    accessorFn: (row) => row.users?.timezone ?? "",
    header: () => <div className="font-semibold min-w-28">Timezone</div>,
  },
  {
    id: "joined",
    accessorFn: (row) => row.users?.created_at ?? "",
    header: () => <div className="font-semibold min-w-28">Joined</div>,
    cell: ({ row }) => {
      return (
        <span>
          {moment(row.original.users?.created_at).format("MMM DD, YYYY")}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="!w-8" />,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 ">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="left">
            <UpdateUser user={row.original.users as User}>
              <DropdownMenuItem asDialogTrigger className="gap-2">
                <Edit01Icon className="size-4" strokeWidth={2} />
                Edit
              </DropdownMenuItem>
            </UpdateUser>

            <DeleteUser user={row.original.users as User}>
              <DropdownMenuItem asDialogTrigger className="gap-2">
                <Trash className="size-4" strokeWidth={2} />
                Delete
              </DropdownMenuItem>
            </DeleteUser>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
