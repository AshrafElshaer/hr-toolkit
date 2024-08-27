import Main from "@/components/main";
import HomeHeader from "./_components/header";
import DashboardLoading from "./loading";

export default function HomePageLayout({
	children,
	admin,
}: {
	children: React.ReactNode;

	admin: React.ReactNode;
}) {
	// const supabase = createServerClient()
	// return <DashboardLoading />
	return (
		
		<Main className="flex-grow flex flex-col gap-4">
			<HomeHeader />
			{admin}
			{children}
		</Main>
	);
}
