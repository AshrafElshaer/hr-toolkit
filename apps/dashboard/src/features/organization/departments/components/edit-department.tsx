"use client";
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
import { DashboardSquareEditIcon, Edit01Icon } from "hugeicons-react";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Tables } from "@toolkit/supabase/types";
import { departmentUpdateSchema } from "@toolkit/supabase/validations";
import { Input } from "@toolkit/ui/input";
import { Label } from "@toolkit/ui/label";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { updateDepartmentAction } from "../departments.actions";

export function UpdateDepartment({
  department,
}: { department: Tables<"departments"> }) {
  const [isOpen, setIsOpen] = useState(false);
  const { execute, isExecuting } = useAction(updateDepartmentAction, {
    onSuccess: () => {
      toast.success("Department updated successfully");
      setIsOpen(false);
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
  } = useForm<z.infer<typeof departmentUpdateSchema>>({
    resolver: zodResolver(departmentUpdateSchema),
    defaultValues: department,
  });

  function onSubmit(data: z.infer<typeof departmentUpdateSchema>) {
    execute(data);
  }

  useEffect(() => {
    if (isOpen) {
      reset(department);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="text-muted-foreground hover:text-foreground transition-colors"
          type="button"
        >
          <Edit01Icon className="size-4" strokeWidth={2} />
        </button>
      </DialogTrigger>
      <DialogContent aria-describedby="new-department-form">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DashboardSquareEditIcon className="size-5 mr-2" />
            Edit Department
          </DialogTitle>
          <DialogDescription>
            Edit the department for your organization to included with job
            postings.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="w-full space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Engineering, Sales, etc."
              {...register("name")}
              error={errors.name?.message}
            />
          </div>
          <div className="flex gap-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                disabled={isExecuting}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="w-full"
              disabled={isExecuting || !isDirty}
            >
              {isExecuting ? (
                <Loader className="size-4 animate-spin mr-2" />
              ) : null}
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
