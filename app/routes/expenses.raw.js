import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

export async function loader({ request }) {
	// redirect if no user session and stop the rest of the loader
	const userId = await requireUserSession(request);
	return getExpenses(userId);
}
