"use client";

import { TimezoneSelector } from "@/components/selectors/timezone-selector";
import { UploadZone } from "@/components/upload-zone";
import { formatBytes } from "@/lib/formatters/format-bytes";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@toolkit/supabase/types";
import { userUpdateSchema } from "@toolkit/supabase/validations";
import { Button } from "@toolkit/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@toolkit/ui/dialog";
import { Input } from "@toolkit/ui/input";
import { Label } from "@toolkit/ui/label";
import { Edit01Icon, UserEdit01Icon, UserIcon } from "hugeicons-react";
import { ImagePlus, Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import type { DropzoneOptions } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { updateUserAction } from "../../../organization.actions";
import { RoleSelector } from "../user-role-selector";

export function UpdateUser({
  user,
  children: trigger,
}: { user: User; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <UserEdit01Icon className="size-5 " strokeWidth={2} />
            Update User
          </DialogTitle>
          <DialogDescription>
            Update user information in your organization.
          </DialogDescription>
        </DialogHeader>
        <UpdateForm setIsOpen={setIsOpen} user={user} />
      </DialogContent>
    </Dialog>
  );
}

function UpdateForm({
  setIsOpen,
  user,
}: {
  setIsOpen: (value: boolean) => void;
  user: User;
}) {
  const { execute, isExecuting } = useAction(updateUserAction, {
    onSuccess: () => {
      toast.success("User updated successfully");
      setIsOpen(false);
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof userUpdateSchema>>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      timezone: user.timezone,
      user_role: user.user_role,
      id: user.id,
    },
  });

  const onSubmit = handleSubmit((data) => {
    execute({
      ...data,
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="sm:flex sm:items-center sm:gap-4 space-y-4 sm:space-y-0">
        <div className="space-y-2 w-full">
          <Label>First Name</Label>
          <Input
            {...register("first_name")}
            placeholder="John"
            error={errors.first_name?.message}
          />
        </div>
        <div className="space-y-2 w-full">
          <Label>Last Name</Label>
          <Input
            {...register("last_name")}
            placeholder="Doe"
            error={errors.last_name?.message}
          />
        </div>
      </div>
      <div className="space-y-2 w-full">
        <Label>Email</Label>
        <Input
          {...register("email")}
          placeholder="john.doe@example.com"
          error={errors.email?.message}
          disabled
        />
      </div>
      <TimezoneSelector
        value={watch("timezone") ?? ""}
        onValueChange={(value) => setValue("timezone", value)}
        isModal
        error={errors.timezone?.message}
      />
      <RoleSelector
        value={watch("user_role") ?? "member"}
        onValueChange={(value) => setValue("user_role", value)}
        error={errors.user_role?.message}
      />
      <div className="flex gap-4">
        <DialogClose asChild>
          <Button variant="outline" className="w-full" disabled={isExecuting}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="w-full" disabled={isExecuting}>
          {isExecuting ? <Loader className="animate-spin size-4 mr-2" /> : null}
          Update
        </Button>
      </div>
    </form>
  );
}
