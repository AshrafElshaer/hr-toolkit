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
import { Add01Icon, DashboardSquareAddIcon } from "hugeicons-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { departmentInsertSchema } from "@toolkit/supabase/validations";
import { Input } from "@toolkit/ui/input";
import { Label } from "@toolkit/ui/label";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { createDepartmentAction } from "../departments.actions";

export function DepartmentForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { execute, isExecuting } = useAction(createDepartmentAction, {
    onSuccess: () => {
      toast.success("Department created successfully");
      setIsOpen(false);
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof departmentInsertSchema>>({
    resolver: zodResolver(departmentInsertSchema),
    defaultValues: {
      name: "",
    
    },
  });

  function onSubmit(data: z.infer<typeof departmentInsertSchema>) {
    execute(data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2 ml-auto">
          New Department <Add01Icon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="new-department-form">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DashboardSquareAddIcon className="size-5 mr-2" />
            New Department
          </DialogTitle>
          <DialogDescription>
            Create a new department for your organization to included with job
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
            <Button type="submit" className="w-full" disabled={isExecuting}>
              {isExecuting ? (
                <Loader className="size-4 animate-spin mr-2" />
              ) : null}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
