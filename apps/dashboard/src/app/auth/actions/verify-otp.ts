"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { action } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";

const otpCodeSchema = z.object({
  email: z.string().email(),
  otpCode: z.string(),
});

export const verifyOtp = action
  .schema(otpCodeSchema)
  .action(async ({ parsedInput }) => {
    const { email, otpCode } = parsedInput;
    const supabase = createServerClient();
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: "magiclink",
    });
    if (error) {
      throw new Error(error.message);
    }

    const organizationId = data.user?.user_metadata.organization_id as string;
    if (!organizationId) {
      redirect("/onboarding");
    }
    if (data.session && data.user) {
      redirect("/");
    }
  });
