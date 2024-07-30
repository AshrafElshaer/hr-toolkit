import Main from "@/components/main";

export default function HomePageLayout({
	children,
	admin,
}: {
	children: React.ReactNode;

	admin: React.ReactNode;
}) {
	return (
		<Main className="flex-grow flex flex-col gap-4">
			{admin}
			{children}
		</Main>
	);
}
