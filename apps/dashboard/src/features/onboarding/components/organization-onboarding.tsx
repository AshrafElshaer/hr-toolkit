"use client";

import { TextGenerateEffect } from "@/components/text-generate-effect";
import {UploadZone} from "@/components/upload-zone";
import { useSession } from "@/hooks/use-session";
import { formatBytes } from "@/lib/formatters/format-bytes";
import { zodResolver } from "@hookform/resolvers/zod";
import { organizationInsertSchema } from "@toolkit/supabase/validations";
import { Button } from "@toolkit/ui/button";
import { Input, UrlInput } from "@toolkit/ui/input";
import { Label } from "@toolkit/ui/label";
import { TextareaWithError } from "@toolkit/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { ImagePlus, Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { DropzoneOptions } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCountdown } from "usehooks-ts";
import type { z } from "zod";
import { onboardOrganizationAction } from "../onboarding.actions";

export function OrganizationOnboarding() {
  const [counter, { startCountdown }] = useCountdown({
    countStart: 3,
    intervalMs: 1000,
  });

  useEffect(() => {
    startCountdown();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {counter !== 0 ? (
        <motion.div
          key={"welcome-message"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          custom={{
            className: "flex-grow grid place-content-center w-full p-4",
          }}
        >
          <TextGenerateEffect
            words="Now, let's set up your organization."
            className="w-full"
          />
        </motion.div>
      ) : (
        <motion.div
          key={"onboarding-form"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          custom={{ className: "w-full p-4" }}
        >
          <OrganizationForm />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function OrganizationForm() {
  const router = useRouter();
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof organizationInsertSchema>>({
    resolver: zodResolver(organizationInsertSchema),
  });

  const { executeAsync: createOrganization, status } = useAction(
    onboardOrganizationAction,
    {
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
      onSuccess: () => {
        router.push("/onboarding/congrats");
      },
    },
  );

  const handleLogoDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
    if (!acceptedFiles[0]) return;

    setLogo(acceptedFiles[0]);
    const logoUrl = URL.createObjectURL(acceptedFiles[0]);
    setLogoPreview(logoUrl);
  };

  const handleLogoDropRejected: DropzoneOptions["onDropRejected"] = (
    rejectedFiles,
  ) => {
    for (const { errors, file } of rejectedFiles) {
      const errorMessage = errors.map((error) => error.message).join(". ");
      toast.error(`Error with ${file.name}: ${errorMessage}`);
    }
  };

  async function onSubmit(data: z.infer<typeof organizationInsertSchema>) {
    if (!logo) {
      toast.error("Logo is required");
      return;
    }

    await createOrganization({ ...data, logo });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
      <section className="flex justify-start items-center gap-4">
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
          {logoPreview ? (
            <Image
              src={logoPreview}
              alt="organization logo"
              className="size-full rounded-md object-cover"
              fill
            />
          ) : (
            <ImagePlus className="size-20" />
          )}
        </UploadZone>

        {!logoPreview ? (
          <div className="flex flex-col text-secondary-foreground">
            <p className="font-bold text-foreground mb-1">Organization Logo</p>
            <p className="text-sm">Accepts: .png, .jpg, .jpeg, .svg</p>
            <p className="text-sm">Max image size: 2MB</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-start">
            <p className="text-sm text-secondary-foreground max-w-48 break-words">
              <span className="font-medium text-foreground">{logo?.name}</span>{" "}
              {formatBytes(logo?.size ?? 0)}
            </p>
            <Button
              variant="destructive"
              size="xs"
              className="w-fit"
              onClick={() => {
                setLogo(null);
                setLogoPreview((url) => {
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

      <div className="flex gap-2">
        <div className="space-y-2 w-full">
          <Label>Organization Name</Label>
          <Input
            {...form.register("name")}
            placeholder="Acme Corp"
            error={form.formState.errors.name?.message}
          />
        </div>
        <div className="space-y-2 w-full">
          <Label>Domain</Label>

          <UrlInput
            {...form.register("domain")}
            placeholder="domain.example"
            error={form.formState.errors.domain?.message}
          />
        </div>
      </div>

      <div className="space-y-2 w-full">
        <Label>Description</Label>
        <TextareaWithError
          {...form.register("description")}
          placeholder="This will be used as a brief description of your organization"
          error={form.formState.errors.description?.message}
        />
      </div>

      <div className="flex gap-2 w-full">
        <div className="space-y-2 w-full">
          <Label>Location</Label>
          <Input
            {...form.register("location")}
            placeholder="New York, USA"
            error={form.formState.errors.location?.message}
          />
        </div>

        <div className="space-y-2 w-full">
          <Label>Industry</Label>
          <Input
            {...form.register("industry")}
            placeholder="Technology"
            error={form.formState.errors.industry?.message}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting || status === "hasSucceeded"}
      >
        {form.formState.isSubmitting ? (
          <Loader className="size-4 animate-spin mr-2" />
        ) : null}
        Complete Setup
      </Button>
    </form>
  );
}
