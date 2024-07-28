import type { ReactNode } from "react";

export default async function OnboardingLayout({
	children,
}: { children: ReactNode }) {
	return (
		<main className=" min-h-[100svh] flex  py-8 px-4 w-full max-w-3xl mx-auto">
			{children}
		</main>
	);
}
