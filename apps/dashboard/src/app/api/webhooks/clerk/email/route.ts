
import { constructClerkWebhook } from "@/lib/clerk-webhooks";
import { resend } from "@/lib/resend";

import { OtpEmail } from "@toolkit/email";


export async function POST(req: Request) {
  const evt = await constructClerkWebhook(req);

  const eventType = evt.type;

  if (eventType !== "email.created")
    return new Response("Event type not supported", { status: 400 });

  const emailAddressId = evt.data.email_address_id;

  if (!emailAddressId) {
    return new Response("Error occurred -- no email address id", {
      status: 400,
    });
  }

  const emailAddress = evt.data.to_email_address;
  const code = evt.data.data?.otp_code;

  if (!emailAddress || !code) {
    return new Response("Error occurred -- no email address or code", {
      status: 400,
    });
  }

  const { error } = await resend.emails.send({
    from: "HR Toolkit Access <onboarding@hrtoolkit.app>",
    to: [emailAddress],
    subject: "HR Toolkit OTP Access",
    react: OtpEmail({
      otpCode: code,
    }),
    headers: {
      "X-Entity-Ref-ID": emailAddressId,
    },
  });

  if (error) {
    return new Response("Error occurred -- failed to send email", {
      status: 500,
    });
  }

  return new Response("", { status: 200 });
}
