import React from "react";
import { employeeDetailsNavigation } from "./employee-navigation";
import { Button } from "@hr-toolkit/ui/button";
import BackButton from "@/components/back-button";
import { ArrowLeft, NotebookTabs } from "lucide-react";
import GeneralInfoLoading from "./(general)/loading";
import Main from "@/components/main";

export default function EmployeeDetailsLoading() {
	return (
		<Main className="flex flex-col  ">
			<section className=" w-full flex items-center gap-2 overflow-x-scroll overflow-y-clip scrollbar-hide py-3 px-4">
				<Button variant="outline" className="items-center">
					<ArrowLeft className="mr-2 w-4 h-4" />
					Back
				</Button>
				<Button className="gap-2" variant="ghost" disabled>
					General
					<NotebookTabs className="w-4 h-4" />
				</Button>
				{/* {employeeDetailsNavigation.map((route) => {
					return (
						<Button
							key={route.title}
							className="gap-2"
							variant="ghost"
							disabled
						>
							{route.icon}
							{route.title}
						</Button>
					);
				})} */}
			</section>
			<GeneralInfoLoading />
		</Main>
	);
}
