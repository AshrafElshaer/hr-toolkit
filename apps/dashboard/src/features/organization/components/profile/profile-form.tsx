"use client";

import Editor from "@/components/editors/advanced";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Organization } from "@toolkit/supabase/types";
import { organizationUpdateSchema } from "@toolkit/supabase/validations";
import { Button, buttonVariants } from "@toolkit/ui/button";
import { Input, UrlInput } from "@toolkit/ui/input";
import { Label } from "@toolkit/ui/label";
import { TextareaWithError } from "@toolkit/ui/textarea";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { updateOrganizationAction } from "../../organization.actions";
import { UploadLogo } from "./upload-logo";
import Link from "next/link";

type ProfileFormProps = {
  organization: Organization;
};

export function ProfileForm({ organization }: ProfileFormProps) {
  const { execute, isExecuting } = useAction(updateOrganizationAction, {
    onSuccess: () => {
      toast.success("Organization updated successfully");
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
  } = useForm<z.infer<typeof organizationUpdateSchema>>({
    resolver: zodResolver(organizationUpdateSchema),
    defaultValues: {
      ...organization,
      admin_id: organization.admin_id ?? undefined,
      profile:
        typeof organization.profile === "string"
          ? JSON.parse(organization.profile)
          : organization.profile ?? undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof organizationUpdateSchema>) => {
    execute(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex justify-end w-full gap-4">
        <Link
          href={`/jobs/${organization.domain}`}
          className={buttonVariants({ variant: "secondary" })}
          target="_blank"
        >
          Preview
        </Link>
        <Button type="submit" disabled={isExecuting || !isDirty} size="sm">
          {isExecuting ? <Loader className="animate-spin mr-2 size-4" /> : null}
          Save
        </Button>
      </div>
      <section className="flex flex-col sm:flex-row items-center gap-4 flex-wrap *:w-full sm:*:w-fit *:space-y-2 sm:*:space-y-0">
        <UploadLogo
          organization_id={organization.id}
          logo_url={organization.logo_url}
          className="!w-fit"
        />
      </section>
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 *:w-full  *:space-y-2 ">
        <div>
          <Label>Name</Label>
          <Input {...register("name")} error={errors.name?.message} />
        </div>
        <div>
          <Label>Domain</Label>
          <UrlInput {...register("domain")} error={errors.domain?.message} />
        </div>
        <div>
          <Label>Location</Label>
          <Input {...register("location")} error={errors.location?.message} />
        </div>
        <div>
          <Label>Industry</Label>
          <Input {...register("industry")} error={errors.industry?.message} />
        </div>
      </section>
      <div className="space-y-2">
        <Label>A Brief Description</Label>
        <TextareaWithError
          {...register("description")}
          error={errors.description?.message}
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Profile</h2>
        <Editor
          initialValue={
            typeof organization.profile === "string"
              ? JSON.parse(organization.profile)
              : organization.profile ?? undefined
          }
          onChange={(value) => {
            setValue("profile", value);
            console.log(value);
          }}
        />
      </div>
     
    </form>
  );
}
