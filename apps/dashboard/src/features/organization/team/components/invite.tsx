"use client";

import { TimezoneSelector } from "@/components/selectors/timezone-selector";
import { UploadZone } from "@/components/upload-zone";
import { formatBytes } from "@/lib/formatters/format-bytes";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInsertSchema } from "@toolkit/supabase/validations";
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
import { UserAdd01Icon, UserIcon } from "hugeicons-react";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { DropzoneOptions, FileRejection } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function InviteTeamMember() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit ml-auto" variant="secondary">
          <UserIcon className="w-4 h-4 mr-2" strokeWidth={2} />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <UserAdd01Icon className="size-5 " strokeWidth={2} />
            Invite Team Member
          </DialogTitle>
          <DialogDescription>
            Invite a team member to your organization.
          </DialogDescription>
        </DialogHeader>
        <InviteForm />
      </DialogContent>
    </Dialog>
  );
}

function InviteForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof userInsertSchema>>({
    resolver: zodResolver(userInsertSchema),
    defaultValues: {
      email: "",
      avatar_url: "",
      first_name: "",
      last_name: "",
      timezone: "",
      user_role: "member",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const handleImageDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
    if (!acceptedFiles[0]) return;

    setImagePreview(URL.createObjectURL(acceptedFiles[0]));
    setImage(acceptedFiles[0]);
  };

  const handleImageDropRejected: DropzoneOptions["onDropRejected"] = (
    rejectedFiles,
  ) => {
    for (const { errors, file } of rejectedFiles) {
      const errorMessage = errors.map((error) => error.message).join(". ");
      toast.error(`Error with ${file.name}: ${errorMessage}`);
    }
  };
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <section className="flex  justify-start items-center gap-4 ">
        <UploadZone
          options={{
            onDrop: handleImageDrop,
            onDropRejected: handleImageDropRejected,
            accept: { "image/*": [".png", ".jpg", ".jpeg"] },
            maxSize: 1024 * 1024, // 1MB in bytes
            multiple: false,
            maxFiles: 1,
          }}
          className=" size-20 rounded-md  flex items-center justify-center text-secondary-foreground"
        >
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="profile picture"
              className="size-full rounded-md object-cover"
              fill
            />
          ) : (
            <ImagePlus className="size-20 " />
          )}
        </UploadZone>
        {!imagePreview ? (
          <div className="flex flex-col  text-secondary-foreground">
            <p className="font-bold text-foreground mb-1">Profile Picture</p>

            <p className="text-sm">Accepts: .png, .jpg, .jpeg</p>
            <p className="text-sm">Max image size: 1MBs</p>
          </div>
        ) : (
          <div className="flex flex-col  gap-2 items-start">
            <p className="text-sm text-secondary-foreground max-w-48 break-words">
              <span className="font-medium text-foreground">{image?.name}</span>{" "}
              {formatBytes(image?.size ?? 0)}
            </p>
            <Button
              variant="destructive"
              size="xs"
              className="w-fit"
              onClick={() => {
                setImage(null);

                setImagePreview((url) => {
                  if (url) {
                    URL.revokeObjectURL(url);
                  }
                  return null;
                });
              }}
            >
              Remove
            </Button>
          </div>
        )}
      </section>
      <div className="sm:flex sm:items-center sm:gap-4">
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
        />
      </div>
      <TimezoneSelector
        value={watch("timezone")}
        onValueChange={(value) => setValue("timezone", value)}
        isModal
      />
      <RoleSelector
        value={watch("user_role")}
        onValueChange={(value) => setValue("user_role", value)}
      />
      <div className="flex gap-4 ">
        <DialogClose asChild>
          <Button variant="outline" className="w-full">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="w-full">
          Invite
        </Button>
      </div>
    </form>
  );
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@toolkit/ui/select";

export default function RoleSelector({
  value,
  onValueChange,
}: {
  value: "admin" | "member";
  onValueChange: (value: "admin" | "member") => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="select-36">Role</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id="select-36" className="[&_[data-desc]]:hidden">
          <SelectValue placeholder="Choose a role" />
        </SelectTrigger>
        <SelectContent
          className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"
          side="top"
        >
          <SelectItem value="admin">
            Admin
            <span
              className="mt-1 block text-xs text-secondary-foreground"
              data-desc
            >
              Full access to all organization resources
            </span>
          </SelectItem>
          <SelectItem value="member">
            Member
            <span
              className="mt-1 block text-xs text-secondary-foreground"
              data-desc
            >
              Limited access to organization resources
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
