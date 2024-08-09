import React from "react";
import type { EventSelect } from "@hr-toolkit/supabase/types";
import ScheduleList from "./schedule-list";

export default function ScheduleListServer() {
	const demoEvents = generateEvents();


	return <ScheduleList events={demoEvents} />;
}

const generateEvents = () => {
	const eventTypes: EventSelect["type"][] = [
		"meeting",
		"workshop",
		"conference",
		"webinar",
		"training",
	];
	const eventNames = [
		"Team Sync",
		"Product Planning",
		"Marketing Strategy",
		"Client Meeting",
		"Annual Review",
		"Quarterly Check-in",
		"Project Kickoff",
		"Development Workshop",
		"Sales Training",
		"Tech Conference",
		"Product Webinar",
		"Leadership Training",
		"Customer Success Seminar",
		"Networking Event",
		"Innovation Summit",
	];
	const eventDescriptions = [
		"Discussing team progress and upcoming tasks",
		"Planning the next product features",
		"Formulating new marketing strategies",
		"Meeting with clients to discuss requirements",
		"Reviewing the past year's performance",
		"Quarterly team performance review",
		"Kickoff meeting for the new project",
		"Hands-on workshop for developers",
		"Training session for the sales team",
		"Conference on the latest in tech",
		"Webinar on product usage and benefits",
		"Training for new leaders",
		"Seminar on customer success strategies",
		"Event to network with industry peers",
		"Summit on the latest innovations",
	];
	const eventLocations = [
		"Conference Room A",
		"Online",
		"Meeting Room 1",
		"Client's Office",
		"Board Room",
		"Zoom",
		"Development Lab",
		"Training Room",
		"Main Auditorium",
		"Virtual",
		"Webex",
		"Leadership Hall",
		"Customer Success Center",
		"Networking Hall",
		"Innovation Hub",
	];

	const demoEvents: EventSelect[] = [];

	for (let i = 1; i <= 15; i++) {
		const isMeeting = i <= 7; // First 7 events are meetings
		const eventType = isMeeting
			? "meeting"
			: eventTypes[Math.floor(Math.random() * (eventTypes.length - 1)) + 1];

		demoEvents.push({
			id: i.toString(),
			name: eventNames[i - 1],
			description: eventDescriptions[i - 1],
			start_time: new Date(new Date().getTime() + i * 3600000).toISOString(), // Start time staggered by 1 hour each
			end_time: new Date(
				new Date().getTime() + (i + 1) * 3600000,
			).toISOString(), // End time staggered by 1 hour each
			type: eventType,
			location: eventLocations[i - 1],
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			department_id: (Math.floor(Math.random() * 5) + 1).toString(), // Random department_id between 1 and 5
			organization_id: (Math.floor(Math.random() * 3) + 1).toString(), // Random organization_id between 1 and 3
			organizer_id: (Math.floor(Math.random() * 10) + 1).toString(), // Random organizer_id between 1 and 10
		});
	}

	return demoEvents;
};
