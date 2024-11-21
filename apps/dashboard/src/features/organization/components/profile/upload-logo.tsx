"use client";

import { UploadZone } from "@/components/upload-zone";
import { useSupabase } from "@/hooks/use-supabase";
import { uploadOrganizationLogo } from "@/lib/supabase/storage/uploads";
import { cn } from "@toolkit/ui/cn";
import Image from "next/image";

import type { ComponentProps } from "react";
import type { DropzoneOptions } from "react-dropzone";
import { toast } from "sonner";
import { uploadOrganizationLogoAction } from "../../organization.actions";
type UploadLogoProps = {
  organization_id: string;
  logo_url: string;
} & ComponentProps<"div">;
export function UploadLogo({
  organization_id,
  logo_url,
  className,
  ...props
}: UploadLogoProps) {
  const supabase = useSupabase();

  const handleLogoDrop: DropzoneOptions["onDrop"] = async (acceptedFiles) => {
    if (!acceptedFiles[0]) return;

    toast.promise(
      async () => {
        const logoUrl = await uploadOrganizationLogo(
          supabase,
          organization_id,
          acceptedFiles[0] as File,
        );

        if (!logoUrl) {
          throw new Error("Error uploading logo. Please try again.");
        }
        const res = await uploadOrganizationLogoAction({
          organization_id,
          logo_url: logoUrl,
        });
        if (res?.serverError) {
          throw new Error(res.serverError);
        }
      },
      {
        loading: "Uploading logo...",
        success: "Logo uploaded successfully",
        error: ({ error }) => error.message,
      },
    );
  };

  const handleLogoDropRejected: DropzoneOptions["onDropRejected"] = (
    rejectedFiles,
  ) => {
    for (const file of rejectedFiles) {
      toast.error(file.errors[0]?.message ?? "Unknown error");
    }
  };
  return (
    <section
      className={cn("flex justify-start items-center gap-4", className)}
      {...props}
    >
      <UploadZone
        options={{
          onDrop: handleLogoDrop,
          onDropRejected: handleLogoDropRejected,
          accept: { "image/*": [".png", ".jpg", ".jpeg", ".svg"] },
          maxSize: 2 * 1024 * 1024, // 2MB in bytes
          multiple: false,
          maxFiles: 1,
        }}
        className="size-20 rounded-md flex items-center justify-center text-secondary-foreground"
      >
        <Image
          src={logo_url}
          alt="organization logo"
          className="size-full rounded-md object-cover"
          fill

        />
      </UploadZone>
    </section>
  );
}
