import { toast } from "sonner";

import type { useSignIn, useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import type { EmailCodeFactor, SignInFirstFactor } from "@clerk/types";
import { z } from "zod";

type SignInWithEmailProps = {
  email: string;
  signIn: NonNullable<ReturnType<typeof useSignIn>["signIn"]>;
};
export async function SignInWithEmail({ email, signIn }: SignInWithEmailProps) {
  const parsedEmail = z.string().email().safeParse(email);

  if (!parsedEmail.success) {
    return {
      error: "Invalid email address",
      data: null,
    };
  }

  try {
    const { supportedFirstFactors } = await signIn.create({
      identifier: parsedEmail.data,
    });

    const isEmailCodeFactor = (
      factor: SignInFirstFactor,
    ): factor is EmailCodeFactor => {
      return factor.strategy === "email_code";
    };
    const emailCodeFactor = supportedFirstFactors?.find(isEmailCodeFactor);

    if (emailCodeFactor) {
      const { emailAddressId } = emailCodeFactor;

      await signIn?.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId,
      });

      return {
        data: parsedEmail.data,
        error: null,
      };
    }
  } catch (error) {
    if (isClerkAPIResponseError(error)) {
      const errorMessage =
        error.errors[0]?.longMessage ?? "An error occurred during sign in";
      toast.error(errorMessage, {
        description:
          errorMessage === "Couldn't find your account."
            ? "Please sign up first"
            : undefined,
      });
      return {
        data: null,
        error: errorMessage,
      };
    }
  }
  return {
    data: null,
    error: "An error occurred during sign in",
  };
}

type SignUpWithEmailProps = {
  data: {
    email: string;
    firstName?: string;
    lastName?: string;
  };
  signUp: NonNullable<ReturnType<typeof useSignUp>["signUp"]>;
};
export async function SignUpWithEmail({ data, signUp }: SignUpWithEmailProps) {
  try {
    await signUp.create({
      emailAddress: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    await signUp.prepareEmailAddressVerification({
      strategy: "email_code",
    });

    return {
      data: data.email,
      error: null,
    };
  } catch (error) {
    if (isClerkAPIResponseError(error)) {
      const errorMessage =
        error.errors[0]?.longMessage ?? "An error occurred during sign up";

      return {
        data: null,
        error: "An error occurred during sign up",
      };
    }
  }

  return {
    data: null,
    error: "An error occurred during sign up",
  };
}
