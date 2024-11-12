"use client";
import { Button } from "@toolkit/ui/button";
import { toast } from "sonner";

export default function OnboardingPage() {
  return (
    <main className="w-full h-screen flex flex-col gap-4">
      <Button
        variant="secondary"
        className="w-fit"
        onClick={() => toast("Hello")}
      >
        Secondary
      </Button>
      <Button
        onClick={() => toast.success("Hello")}
        variant="success"
        className="w-fit"
      >
        Success
      </Button>
      <Button
        onClick={() => toast.error("Hello")}
        variant="destructive"
        className="w-fit"
      >
        Destructive
      </Button>
      <Button
        onClick={() => toast.info("Hello")}
        variant="info"
        className="w-fit"
      >
        Info
      </Button>
      <Button
        onClick={() => toast.warning("Hello")}
        variant="warning"
        className="w-fit"
      >
        Warning
      </Button>
    </main>
  );
}
