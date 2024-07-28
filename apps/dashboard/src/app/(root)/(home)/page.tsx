import Main from "@/components/main";
import React, { Suspense } from "react";
import ClientComponent from "./client-component";
import ServerComponent from "./server-component";
import { Skeleton } from "@hr-toolkit/ui/skeleton";

export default async function HomePage() {
	return (
		<Main>
			<Suspense fallback={<Skeleton className="size-20" />}>
				<ClientComponent>
					<ServerComponent />
				</ClientComponent>
			</Suspense>

			<div className="mt-12">hello world</div>
		</Main>
	);
}
