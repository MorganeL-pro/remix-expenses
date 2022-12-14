//pathless component to wrap all the files in __marketing folder with the same style without adding /marketing/pricing in the url

import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";
import marketingStyles from "~/styles/marketing.css";

export default function MarketingLayout() {
	return (
		<>
			<MainHeader />
			<Outlet />;
		</>
	);
}

export function loader({ request }) {
	return getUserFromSession(request);
}

export function links() {
	return [{ rel: "stylesheet", href: marketingStyles }];
}

// headers in pathless route (to send it to child route)
export function headers() {
	return {
		"Cache-Control": "max-age=3600", // 60 minutes of cache in production
	};
}
