import type { User } from "@toolkit/supabase/types";
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
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { deleteUserAction } from "../../../organization.actions";

export default function DeleteUser({
  user,
  children: trigger,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const { execute, isExecuting } = useAction(deleteUserAction, {
    onSuccess: () => {
      toast.success("User deleted successfully");
      setIsOpen(false);
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Something went wrong");
    },
  });
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          <Label>
            Type
            <span className="bg-muted rounded-sm mx-2 p-1 font-semibold">
              {user.email}
            </span>
            to confirm deletion
          </Label>
          <Input
            type="email"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder="Type the instructed text above to confirm deletion"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full" disabled={isExecuting}>
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={confirmation !== user.email || isExecuting}
            className="w-full"
            onClick={() => execute({ id: user.id })}
          >
            {isExecuting ? (
              <Loader className="animate-spin size-4 mr-2" />
            ) : null}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
