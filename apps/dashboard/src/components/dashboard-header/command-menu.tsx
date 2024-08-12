"use client";

import * as React from "react";
import {
	ArrowDown,
	ArrowUp,
	Calculator,
	Calendar,
	CornerDownLeft,
	CreditCard,
	Search,
	Settings,
	Smile,
	User,
} from "lucide-react";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@hr-toolkit/ui/command";
import { Button } from "@hr-toolkit/ui/button";
import NoteDialog from "@/app/(root)/(home)/_components/notes/note-dialog";
import { FaRegNoteSticky } from "react-icons/fa6";
import { createClient } from "@/lib/supabase/client";
import { getCurrentUser } from "@hr-toolkit/supabase/user-queries";
import { useQuery } from "@tanstack/react-query";
import { roleBasedNavigation } from "@/constants/sidebar-navigations";
import { useRouter } from "next/navigation";

export function CommandMenu() {
	const [open, setOpen] = React.useState(false);
	const [isNewNote, setIsNewNote] = React.useState(false);

	const router = useRouter();
	const supabase = createClient();
	const { data: currentUser } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const { error, user } = await getCurrentUser(supabase);
			if (error) {
				throw Error(error.message);
			}
			return user;
		},
	});
	const allowedNavigation = React.useMemo(() => {
		return roleBasedNavigation(currentUser?.user_role ?? "");
	}, [currentUser?.user_role]);
	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<>
			<Button
				variant={"outline"}
				className="text-muted-foreground w-72 flex items-center gap-2 px-2"
				onClick={() => setOpen(true)}
			>
				<Search className="size-4" />
				<span>Quick Search</span>
				<kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<div className="relative">
					<Search className=" size-4 absolute left-4 top-4 text-muted-foreground" />
					<CommandInput
						placeholder="Type a command or search..."
						className="pl-10"
					/>
				</div>
				<CommandList className="flex-1">
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup
						className="*:text-foreground/75 *:aria-selected:text-foreground"
						heading="Navigation"
					>
						{allowedNavigation.map((route) => {
							return (
								<CommandItem
									key={route.path}
									onSelect={() => {
										router.push(route.path);
										setOpen(false);
									}}
									className="hover:border gap-4 aria-selected:border aria-selected:bg-accent/70 hover:bg-accent/70"
								>
									{route.icon}
									<span>{route.title}</span>
								</CommandItem>
							);
						})}
					</CommandGroup>

					<CommandSeparator />

					<CommandGroup
						className="*:text-foreground/75 hover:text-foreground "
						heading="Quick actions"
					>
						<CommandItem
							className="hover:border aria-selected:border aria-selected:bg-accent/70 hover:bg-accent/70"
							onSelect={() => setIsNewNote(true)}
						>
							<FaRegNoteSticky className="mr-2 h-3 w-3" />
							<span>New Note</span>
						</CommandItem>
						<NoteDialog open={isNewNote} setOpen={setIsNewNote} />
					</CommandGroup>
				</CommandList>
				<CommandSeparator />
				<div className="flex items-center justify-between p-2 text-sm *:flex *:items-center *:gap-2">
					<div>
						<span>ESC</span>
						<span className="text-muted-foreground">to close</span>
					</div>
					<div>
						<ArrowUp className="bg-secondary size-5 p-0.5 rounded" />
						<ArrowDown className="bg-secondary size-5 p-0.5 rounded" />

						<span className="text-muted-foreground">to navigate,</span>
					</div>
					<div>
						<CornerDownLeft className="bg-secondary size-5 p-0.5 rounded" />

						<span className="text-muted-foreground">to select</span>
					</div>
				</div>
			</CommandDialog>
		</>
	);
}
