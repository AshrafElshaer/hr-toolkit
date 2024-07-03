import { createServerClient } from "@hr-toolkit/supabase/server";
import { getEmployeeById } from "@hr-toolkit/supabase/user-queries";
import { capitalize } from "lodash";

import { Avatar, AvatarFallback, AvatarImage } from "@hr-toolkit/ui/avatar";
import { Card } from "@hr-toolkit/ui/card";

type Props = {
	employeeId: string;
};

async function EmployeeInfo({ employeeId }: Props) {
	const supabase = createServerClient();
	const employee = await getEmployeeById(supabase, employeeId);

	return (
		<Card className="px-4 py-2 w-full  flex flex-col items-start sm:flex-row sm:items-center sm:gap-20 justify-between ">
			<div className="flex items-center justify-between w-full">
				<div>
					<span className="text-sm text-muted-foreground ml-10">Employee</span>
					<div className="flex items-center gap-2">
						<Avatar className="h-8 w-8 cursor-pointer">
							<AvatarImage src={employee.avatar_url ?? ""} />
							<AvatarFallback>
								{employee.first_name ? employee.first_name[0] : ""}
								{employee.last_name ? employee.last_name[0] : ""}
							</AvatarFallback>
						</Avatar>
						<h4>
							{employee?.first_name} {employee?.last_name}
						</h4>
					</div>
				</div>
				<div>
					<span className="text-sm text-muted-foreground">Job Title</span>
					<p>{employee?.position}</p>
				</div>
			</div>

			<div className="flex items-center justify-between w-full">
				<div>
					<span className="text-sm text-muted-foreground">Department</span>
					<p>
						{employee?.department?.name} - {employee?.department?.description}
					</p>
				</div>

				<div>
					<span className="text-sm text-muted-foreground">Status</span>
					<p>{capitalize(employee?.employment_status ?? "")}</p>
				</div>
			</div>
		</Card>
	);
}

export default EmployeeInfo;
