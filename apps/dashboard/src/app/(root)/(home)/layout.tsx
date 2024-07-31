import Main from "@/components/main";
import ClockInOut from "./_components/header/clock-in-out";
import HomeHeader from "./_components/header";

export default function HomePageLayout({
	children,
	admin,
}: {
	children: React.ReactNode;

	admin: React.ReactNode;
}) {
	return (
		<Main className="flex-grow flex flex-col gap-4">
			<HomeHeader />
			{admin}
			{children}
		</Main>
	);
}
