"use client";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import type {
  ClerkAPIError,
  EmailCodeFactor,
  SignInFirstFactor,
} from "@clerk/types";
import { Button } from "@toolkit/ui/button";
import { Card } from "@toolkit/ui/card";
import { Icons } from "@toolkit/ui/icons";
import { Input } from "@toolkit/ui/input";
import { Label } from "@toolkit/ui/label";
import { Separator } from "@toolkit/ui/separator";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Mail01Icon } from "hugeicons-react";
import { Loader } from "lucide-react";
import { useQueryStates } from "nuqs";
import { useEffect, useState } from "react";
import { FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import { authSearchParams } from "../auth-search-params";
import { SignInWithEmail } from "../auth.lib";
import { SignInWithSocial } from "./sign-in-with-social";

export function SignIn() {
  const [_, setAuthParams] = useQueryStates(authSearchParams, {
    shallow: true,
  });
  const {
    value: isPreparing,
    setTrue: setPreparingTrue,
    setFalse: setPreparingFalse,
  } = useBoolean();
  const { isLoaded, signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  async function handleSignInWithEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!signIn || !isLoaded) return;

    setPreparingTrue();
    const { error } = await SignInWithEmail({
      email,
      signIn,
    });

    if (error) {
      setEmailError(error);
      toast.error(error);
      return;
    }
    setAuthParams({
      auth_type: "sign-in",
      email: email,
      active_tap: "verify-otp",
    });
    setPreparingFalse();
  }

  useEffect(() => {
    if (emailError) {
      setEmailError(undefined);
    }
  }, [email]);
  return (
    <Card className="flex flex-col py-10 px-0 max-w-sm w-full mx-auto">
      <Icons.Logo className="size-14 mx-auto mb-4" />
      <h2 className="mb-0.5 text-lg font-bold text-center">Welcome back</h2>
      <p className="text-center text-secondary-foreground">
        Sign in to your account to continue
      </p>

      {/* <SignInWithSocial /> */}
      {/* <Separator className="mb-6 w-full" /> */}

      <section className="space-y-4 px-4 mt-8">
        <form onSubmit={handleSignInWithEmail} className="space-y-4">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            startIcon={<Mail01Icon size={20} />}
            placeholder="example@domain.com"
            error={emailError}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Button
            variant="secondary"
            disabled={isPreparing}
            type="submit"
            className="w-full"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isPreparing ? (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  key="sending-otp"
                >
                  <Loader className="animate-spin size-4 mr-2" />
                  Sending otp email...
                </motion.span>
              ) : (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  key="continue"
                >
                  Continue
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </form>
        <div className="flex items-center gap-2">
          <p className=" text-sm text-secondary-foreground">
            Don't have an account?{" "}
          </p>
          <Button
            variant="link"
            onClick={() =>
              setAuthParams({ auth_type: "sign-up", active_tap: "sign-up" })
            }
            className="p-0"
            disabled={isPreparing}
          >
            Sign up
          </Button>
        </div>
      </section>
      <Separator className="my-6 w-full" />
      <section className="space-y-1 px-4">
        <div className="flex items-center gap-2">
          <p className=" text-sm text-secondary-foreground">
            By signing in you agree to our{" - "}
          </p>
          <Button variant="link" className="p-0" disabled={isPreparing}>
            Terms of Service
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <p className=" text-sm text-secondary-foreground">Need help ?</p>
          <Button variant="link" className="p-0" disabled={isPreparing}>
            Contact Support
          </Button>
        </div>
      </section>
    </Card>
  );
}
