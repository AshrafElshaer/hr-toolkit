"use client";

import * as React from "react";
import {
	Calculator,
	Calendar,
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

export function CommandMenu() {
	const [open, setOpen] = React.useState(false);

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
				className="text-muted-foreground w-56 flex items-center gap-2 px-2"
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
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem className="hover:border aria-selected:border aria-selected:bg-accent/70 hover:bg-accent/70">
							<Calendar className="mr-2 h-4 w-4" />
							<span>Calendar</span>
						</CommandItem>
						<CommandItem className="hover:border aria-selected:border aria-selected:bg-accent/70 hover:bg-accent/70">
							<Smile className="mr-2 h-4 w-4" />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem className="hover:border aria-selected:border aria-selected:bg-accent/70 hover:bg-accent/70">
							<Calculator className="mr-2 h-4 w-4" />
							<span>Calculator</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem className="hover:border aria-selected:border aria-selected:bg-accent/70 hover:bg-accent/70">
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem className="hover:border aria-selected:border aria-selected:bg-accent/70 hover:bg-accent/70">
							<CreditCard className="mr-2 h-4 w-4" />
							<span>Billing</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem className="hover:border aria-selected:border aria-selected:bg-accent/70 hover:bg-accent/70">
							<Settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}
