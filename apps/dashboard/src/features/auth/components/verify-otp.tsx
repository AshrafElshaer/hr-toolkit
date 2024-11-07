import { useSignIn, useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import type { EmailCodeFactor, SignInFirstFactor } from "@clerk/types";
import { Button } from "@toolkit/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@toolkit/ui/card";
import { cn } from "@toolkit/ui/cn";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@toolkit/ui/input-otp";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useBoolean, useCountdown } from "usehooks-ts";
import { z } from "zod";
import { authSearchParams } from "../auth-search-params";

export function VerifyOtp() {
  const router = useRouter();
  const [
    resendTimer,
    { resetCountdown: resetResendTimer, startCountdown: startResendTimer },
  ] = useCountdown({
    countStart: 59,
    intervalMs: 1000,
  });

  const {
    value: isVerifying,
    setTrue: setIsVerifyingTrue,
    setFalse: setIsVerifyingFalse,
  } = useBoolean();
  const {
    value: isResending,
    setTrue: setIsResendingTrue,
    setFalse: setIsResendingFalse,
  } = useBoolean();
  const {
    isLoaded: isLoadedSignUp,
    signUp,
    setActive: setSignUpActive,
  } = useSignUp();
  const {
    isLoaded: isLoadedSignIn,
    signIn,
    setActive: setSignInActive,
  } = useSignIn();
  const [{ auth_type, redirect_url, email }, setAuthParams] = useQueryStates(
    authSearchParams,
    {
      shallow: true,
    },
  );
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    startResendTimer();
  }, [startResendTimer]);

  function onComplete(code: string) {
    setIsVerifyingTrue();
    if (auth_type === "sign-up") {
      signUpVerify(code);
    } else {
      signInVerify(code);
    }
    setIsVerifyingFalse();
  }

  async function signUpVerify(code: string) {
    if (!isLoadedSignUp) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setSignUpActive({ session: signUpAttempt.createdSessionId });
        router.push(redirect_url ?? "/");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        const errorMessage =
          error.errors[0]?.longMessage ?? "An error occurred during sign up";
        toast.error(errorMessage, {
          description:
            errorMessage === "Couldn't find your account."
              ? "Please sign up first"
              : undefined,
        });
      }
      setIsError(true);
      return;
    }
  }
  async function signInVerify(code: string) {
    if (!isLoadedSignIn || !signIn) return null;

    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });

      if (signInAttempt.status === "complete") {
        await setSignInActive({ session: signInAttempt.createdSessionId });

        router.push(redirect_url ?? "/");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        const errorMessage =
          error.errors[0]?.longMessage ?? "An error occurred during sign in";
        toast.error(errorMessage);
      }
      setIsError(true);
      return;
    }
  }

  async function resendOtp() {
    if (auth_type === "sign-up") {
      await SignUpWithEmail();
    } else {
      await SignInWithEmail();
    }

    resetResendTimer();
    startResendTimer();
  }

  async function SignInWithEmail() {
    if (!isLoadedSignIn || !signIn) return null;

    setIsResendingTrue();

    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: email,
      });

      const isEmailCodeFactor = (
        factor: SignInFirstFactor,
      ): factor is EmailCodeFactor => {
        return factor.strategy === "email_code";
      };
      const emailCodeFactor = supportedFirstFactors?.find(isEmailCodeFactor);

      if (emailCodeFactor) {
        const { emailAddressId } = emailCodeFactor;

        await signIn.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId,
        });
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
      }
      return;
    } finally {
      setIsResendingFalse();
    }
  }

  async function SignUpWithEmail() {
    if (!isLoadedSignUp || !signUp) return;

    setIsResendingTrue();

    try {
      await signUp.create({
        emailAddress: email,
        firstName: "",
        lastName: "",
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        const errorMessage =
          error.errors[0]?.longMessage ?? "An error occurred during sign up";
        toast.error(errorMessage, {
          description:
            errorMessage === "Couldn't find your account."
              ? "Please sign up first"
              : undefined,
        });
      }
      return;
    } finally {
      setIsResendingFalse();
    }
  }

  return (
    <Card className="flex flex-col items-center w-full max-w-sm pt-6">
      <CardHeader className="flex flex-col gap-2 items-center w-full">
        <CardTitle>Check your email</CardTitle>
        <CardDescription>
          We&apos;ve sent a one time pass code to{" "}
        </CardDescription>
        <CardDescription>
          <strong>{email}</strong>
        </CardDescription>
        <Button
          className="text-secondary-foreground"
          onClick={() => {
            setAuthParams({
              email: null,
              auth_type: "sign-in",
              active_tap: "sign-in",
            });
          }}
          variant="outline"
        >
          Wrong email --&gt; change it
        </Button>
      </CardHeader>
      <CardContent className="">
        <h2 className=" font-semibold text-center mb-6">
          Enter the pass code to sign in
        </h2>
        <InputOTP
          // eslint-disable-next-line jsx-a11y/no-autofocus -- This is an OTP input field
          autoFocus
          maxLength={6}
          onComplete={onComplete}
          pattern={REGEXP_ONLY_DIGITS}
          onChange={() => {
            if (isError) {
              setIsError(false);
            }
          }}
          className={cn(isError && "animate-shake")}
        >
          <InputOTPGroup>
            <InputOTPSlot
              index={0}
              className={cn(isError && "border-destructive")}
            />
            <InputOTPSlot
              index={1}
              className={cn(isError && "border-destructive")}
            />
            <InputOTPSlot
              index={2}
              className={cn(isError && "border-destructive")}
            />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot
              index={3}
              className={cn(isError && "border-destructive")}
            />
            <InputOTPSlot
              index={4}
              className={cn(isError && "border-destructive")}
            />
            <InputOTPSlot
              index={5}
              className={cn(isError && "border-destructive")}
            />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>
      <CardFooter className="w-full grid px-2">
        <Button
          disabled={isVerifying || resendTimer !== 0 || isResending}
          onClick={resendOtp}
          variant="secondary"
          className="w-full"
        >
          <AnimatePresence initial={false} mode="wait">
            {!isVerifying && !isResending && resendTimer === 0 && (
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                key="resend-passcode"
                transition={{ duration: 0.2 }}
              >
                Resend Pass code
              </motion.span>
            )}
            {!isVerifying && !isResending && resendTimer !== 0 && (
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                key="resend-timer"
                transition={{ duration: 0.2 }}
              >
                {`Resend Pass code in ${resendTimer}s`}
              </motion.span>
            )}
            {isVerifying ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                key="verifying-otp"
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Verifying Pass code ...
              </motion.div>
            ) : null}
            {isResending ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                key="resending-passcode"
                transition={{ duration: 0.2 }}
              >
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Resending Pass Code ...
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Button>
      </CardFooter>
    </Card>
  );
}
