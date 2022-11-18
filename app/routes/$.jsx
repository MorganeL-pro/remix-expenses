// splat route

import { redirect, Response } from "@remix-run/node";

export function loader({ params }) {
	// redirect to expenses page when the url is /exp instead of /expenses
	if (params["*"] === "exp") {
		return redirect("/expenses");
	}

	// else redirect to error page
	throw new Response("Not found", { status: 404 });
}
