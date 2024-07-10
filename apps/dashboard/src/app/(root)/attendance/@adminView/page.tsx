import Main from "@/components/main";
import React from "react";

import AdminView from "../_components/admin-view";

type Props = {
	searchParams?: { [key: string]: string | undefined };
};
export default async function AttendancePage({ searchParams }: Props) {
	return (
		<Main className="flex flex-col items-center justify-center" maxHeight>
			<AdminView searchParams={searchParams} />
		</Main>
	);
}
