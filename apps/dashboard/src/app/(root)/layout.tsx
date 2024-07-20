import { headers } from "next/headers";
import { redirect } from "next/navigation";

import DashboardHeader from "@/components/dashboard-header/dashboard-header";

import type { ReactNode } from "react";
import MainSidebar from "@/components/sidebar/main-sidebar";

async function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="w-full  h-[100svh] max-w-[1440px] mx-auto">{children}</div>
	);

	// 	<ResizablePanelGroup
	// 		direction="vertical"
	// 		className="w-full  border min-h-[100svh] max-w-[1440px] mx-auto"
	// 	>
	// 		<ResizablePanel defaultSize={4} className="min-h-[50px] border-b grid">
	// 			<DashboardHeader currentUser={user} />
	// 		</ResizablePanel>

	// 		<ResizablePanel defaultSize={96}>
	// 			<ResizablePanelGroup direction="horizontal">
	// 				<ResizablePanel
	// 					defaultSize={1}
	// 					className="border-r min-w-[185px] hidden md:block shadow-md"
	// 				>
	// 					<MainSidebar currentUser={user} />
	// 				</ResizablePanel>

	// 				<ResizablePanel defaultSize={99}>{children}</ResizablePanel>
	// 			</ResizablePanelGroup>
	// 		</ResizablePanel>
	// 	</ResizablePanelGroup>
	// );
}

export default DashboardLayout;
