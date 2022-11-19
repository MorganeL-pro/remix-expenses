import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import { getExpenses } from "~/data/expenses.server";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import Error from "~/components/util/Error";
import { requireUserSession } from "~/data/auth.server";

export default function ExpensesAnalysisPage() {
	const expenses = useLoaderData();

	return (
		<main>
			<Chart expenses={expenses} />
			<ExpenseStatistics expenses={expenses} />
		</main>
	);
}

// return array of expenses
export async function loader({ request }) {
	// redirect if no user session and stop the rest of the loader
	const userId = await requireUserSession(request);

	const expenses = await getExpenses(userId);

	if (!expenses || expenses.length === 0) {
		throw json(
			{ message: "Could not load expenses." },
			{ status: 404, statusText: "Expenses not found" }
		);
	}

	return expenses; // or return json(expenses)
}

// closest catchboundary - it does not replace all the root page but only Outlet (navigation stays)
export function CatchBoundary() {
	const caughtResponse = useCatch();

	return (
		<main>
			<Error title={caughtResponse.statusText}>
				<p>{caughtResponse.data?.message || "Something went wrong"}</p>
			</Error>
		</main>
	);
}
