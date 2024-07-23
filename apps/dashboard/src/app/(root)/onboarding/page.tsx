"use client";
import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
// import OnboardingForm from "./components/onboarding";
import { TextGenerateEffect } from "@/components/text-generate-effect";

import {
	OrganizationForm,
	OrganizationOnboarding,
} from "./_components/organization-form";
import { useCounter } from "usehooks-ts";
import { OwnerOnboarding } from "./_components/owner-form";
import CongratsScreen from "./_components/congrats-screen";

export default function OnboardingPage() {
	const { count: step, increment: nextStep } = useCounter(1);

	return (
		<main className=" min-h-[100svh] flex  py-8 px-4 w-full max-w-3xl mx-auto">
			{step === 1 ? (
				<OrganizationOnboarding nextStep={nextStep} />
			) : step === 2 ? (
				<OwnerOnboarding nextStep={nextStep} />
			) : (
				<CongratsScreen />
			)}
		</main>
	);
}
