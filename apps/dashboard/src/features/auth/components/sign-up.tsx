"use client";

import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import { authSearchParams } from "../auth-search-params";
import { SignUpWithEmail } from "../lib";

const signUpSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
});

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });
  const [_, setAuthParams] = useQueryStates(authSearchParams, {
    shallow: true,
  });
  const { isLoaded, signUp } = useSignUp();

  const {
    value: isPreparing,
    setTrue: setPreparingTrue,
    setFalse: setPreparingFalse,
  } = useBoolean();

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    if (!isLoaded) return;

    setPreparingTrue();

    const { error } = await SignUpWithEmail({ data, signUp });

    setPreparingFalse();

    if (error) {
      toast.error(error);
      return;
    }

    setAuthParams({ active_tap: "verify-otp", email: data.email });
  }

  return (
    <Card className=" py-10 px-0 max-w-sm w-full mx-auto">
      <Icons.Logo className="size-14 mx-auto mb-4" />
      <h2 className="mb-0.5 text-lg font-bold text-center">
        Welcome to HR Toolkit
      </h2>
      <p className="text-center text-secondary-foreground">
        Create your account with us
      </p>

      <section className="space-y-4 px-4 mt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                {...register("firstName")}
                error={errors.firstName?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              startIcon={<Mail01Icon size={20} />}
              placeholder="example@domain.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <Button
            variant="secondary"
            disabled={isPreparing}
            type="submit"
            className="w-full"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isPreparing ? (
                <motion.span
                  key="sending-otp-email"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Loader className="animate-spin size-4 mr-2" />
                  Sending otp email...
                </motion.span>
              ) : (
                <motion.span
                  key="sign-up-with-email"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  Sign up with email
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </form>
      </section>

      <div className="flex items-center gap-2 px-4 mt-4">
        <p className=" text-sm text-secondary-foreground">
          Already have an account?{" "}
        </p>
        <Button
          variant="link"
          onClick={() =>
            setAuthParams({ auth_type: "sign-in", active_tap: "sign-in" })
          }
          className="p-0"
          disabled={isPreparing}
        >
          Sign in
        </Button>
      </div>

      <Separator className="my-6 w-full" />
      <section className="flex flex-col gap-1  px-4">
        <div className="flex items-center gap-2">
          <p className=" text-sm text-secondary-foreground">
            By signing up you agree to our{" - "}
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
