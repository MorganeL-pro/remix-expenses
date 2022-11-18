//pathless component to wrap all the files in __marketing folder with the same style without adding /marketing/pricing in the url

import { Outlet } from "@remix-run/react";
import marketingStyles from "~/styles/marketing.css";

export default function MarketingLayout() {
	return <Outlet />;
}

export function links() {
	return [{ rel: "stylesheet", href: marketingStyles }];
}
