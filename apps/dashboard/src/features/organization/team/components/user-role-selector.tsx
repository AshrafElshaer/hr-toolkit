import { Label } from "@toolkit/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@toolkit/ui/select";

export function RoleSelector({
  value,
  onValueChange,
  error,
}: {
  value: "admin" | "member";
  onValueChange: (value: "admin" | "member") => void;
  error?: string;
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
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
