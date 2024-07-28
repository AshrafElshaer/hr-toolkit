"use server";

import { OtpEmail } from "@hr-toolkit/emails";
import { z } from "zod";
import { resend } from "@/lib/resend";
import { action } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";

const otpEmailSchema = z.object({
  email: z.string().email(),
});

async function generateOtpCode({ email }: { email: string }) {
  const supabase = createServerClient({
    isAdmin: true,
  });
  return supabase.auth.admin.generateLink({
    email,
    type: "magiclink",
  });
}

export const sendOtpEmail = action
  .schema(otpEmailSchema)
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput;
    const { data: otpResponse, error: otpError } = await generateOtpCode({
      email,
    });
    if (otpError || !otpResponse.properties.email_otp) {
      console.log(otpError);
      throw new Error(otpError?.message || "Failed to generate OTP code");
    }

    const { data: emailResponse, error: emailError } = await resend.emails.send(
      {
        from: "HR Toolkit <onboarding@hrtoolkit.app>",
        to: [email],
        subject: "HR Toolkit OTP Access",
        react: OtpEmail({
          otpCode: otpResponse.properties.email_otp,
        }),
      },
    );

    if (emailError || !emailResponse?.id) {
      throw new Error(emailError?.message || "Failed to send OTP email");
    }

    return otpResponse.user.email;
  });
