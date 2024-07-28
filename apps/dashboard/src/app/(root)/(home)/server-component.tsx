import React from "react";

export default async function ServerComponent() {
	const isServer = typeof window === "undefined";
    await new Promise((resolve) => setTimeout(resolve, 5000));
	return <div className="size-20 bg-slate-700">{""}</div>;
}
