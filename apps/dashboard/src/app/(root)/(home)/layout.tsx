import Main from "@/components/main";
import HomeHeader from "./_components/header";
import DashboardLoading from "./loading";
import { createServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@hr-toolkit/supabase/user-queries";

export default async function HomePageLayout({
	children,
	admin,
}: {
	children: React.ReactNode;
	admin: React.ReactNode;
}) {
	const supabase = createServerClient();
	const { user } = await getCurrentUser(supabase);

	return (
		<Main className="flex-grow flex flex-col gap-4">
			{children}
			{user?.user_role === "admin" ? admin : null}
		</Main>
	);
}
