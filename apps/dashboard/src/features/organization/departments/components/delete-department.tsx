"use client";

import type { Tables } from "@toolkit/supabase/types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@toolkit/ui/alert-dialog";
import { Button } from "@toolkit/ui/button";
import { Input } from "@toolkit/ui/input";
import { Label } from "@toolkit/ui/label";
import { Loader, TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { deleteDepartmentAction } from "../departments.actions";

export function DeleteDepartment({
  department,
}: { department: Tables<"departments"> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const { execute, isExecuting } = useAction(deleteDepartmentAction, {
    onSuccess: () => {
      toast.success("Department deleted successfully");
      setIsOpen(false);
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button
          className="text-muted-foreground hover:text-foreground transition-colors"
          type="button"
        >
          <TrashIcon className="size-4" strokeWidth={2} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Department ( {department.name} )
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this department? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4">
          <Label>
            Type
            <span className="bg-muted rounded-sm mx-2 p-1 font-semibold">
              {department.name}
            </span>
            to confirm deletion
          </Label>
          <Input
            type="text"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder="Type the instructed text above to confirm deletion"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={confirmation !== department.name || isExecuting}
            onClick={() => execute({ departmentId: department.id })}
            className="w-full"
          >
            {isExecuting ? (
              <Loader className="size-4 animate-spin mr-2" />
            ) : null}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
