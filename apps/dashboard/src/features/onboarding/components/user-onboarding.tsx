"use client";

import { TextGenerateEffect } from "@/components/text-generate-effect";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCountdown } from "usehooks-ts";

export function UserOnboarding() {
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
            className: "flex-grow grid place-content-center w-full  p-4",
          }}
        >
          <TextGenerateEffect
            words="First, let's gather basic information about you."
            className="w-full "
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
          <UserForm />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import {UploadZone} from "@/components/upload-zone";
import { useSession } from "@/hooks/use-session";
import { zodResolver } from "@hookform/resolvers/zod";

import { TimezoneSelector } from "@/components/selectors/timezone-selector";
import { formatBytes } from "@/lib/formatters/format-bytes";

import { uploadUserAvatar } from "@/lib/supabase/storage/uploade";
import { userInsertSchema } from "@toolkit/supabase/validations";
import { Button } from "@toolkit/ui/button";
import { Input } from "@toolkit/ui/input";
import { Label } from "@toolkit/ui/label";
import { ImagePlus, Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { DropzoneOptions } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { onboardUserAction } from "../onboarding.actions";

function UserForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof userInsertSchema>>({
    defaultValues: {
      email: session?.data?.session?.user.email ?? "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      user_role: "admin",
    },
    resolver: zodResolver(userInsertSchema),
  });

  const { executeAsync: createUser, status } = useAction(onboardUserAction, {
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
    onSuccess: () => {
      router.push("/onboarding/organization");
    },
  });

  const handleImageDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
    if (!acceptedFiles[0]) return;

    setImage(acceptedFiles[0]);
    const imageUrl = URL.createObjectURL(acceptedFiles[0]);
    setImagePreview(imageUrl);
  };

  const handleImageDropRejected: DropzoneOptions["onDropRejected"] = (
    rejectedFiles,
  ) => {
    for (const { errors, file } of rejectedFiles) {
      const errorMessage = errors.map((error) => error.message).join(". ");
      toast.error(`Error with ${file.name}: ${errorMessage}`);
    }
  };

  async function onSubmit(data: z.infer<typeof userInsertSchema>) {
    let avatarUrl: string | undefined;

    if (image && session?.data?.session?.user.id) {
      const { data: uploadData } = await uploadUserAvatar(
        session.data.session.user.id,
        image,
      );
      avatarUrl = uploadData?.publicUrl;
    }

    await createUser({ ...data, avatar_url: avatarUrl });
  }

  useEffect(() => {
    form.setValue("email", session?.data?.session?.user.email ?? "");
  }, [session?.data?.session?.user.email]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
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

      <div className="flex items-center gap-2">
        <div className="space-y-2 ">
          <Label>First Name</Label>
          <Input
            {...form.register("first_name")}
            placeholder="John"
            error={form.formState.errors.first_name?.message}
          />
        </div>

        <div className="space-y-2">
          <Label>Last Name</Label>
          <Input
            {...form.register("last_name")}
            placeholder="Doe"
            error={form.formState.errors.last_name?.message}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          {...form.register("email")}
          placeholder="john.doe@example.com"
          error={form.formState.errors.email?.message}
          disabled
        />
      </div>

      <TimezoneSelector
        value={form.watch("timezone")}
        onValueChange={(value) => form.setValue("timezone", value)}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting || status === "hasSucceeded"}
      >
        {form.formState.isSubmitting ? (
          <Loader className="size-4 animate-spin mr-2" />
        ) : null}
        Continue
      </Button>
    </form>
  );
}
