// /expenses => shared layout

import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import { FaPlus, FaDownload } from "react-icons/fa";
import { getExpenses } from "~/data/expenses.server";
import { requireUserSession } from "~/data/auth.server";
import { json } from "@remix-run/node";
// import { json } from "@remix-run/node";

export default function ExpensesLayout() {
	const expenses = useLoaderData();
	//console.log(expenses);

	const hasExpenses = expenses && expenses.length > 0;

	return (
		<>
			<Outlet />
			<main>
				<section id="expenses-actions">
					<Link to="add">
						<FaPlus />
						<span>Add Expense</span>
					</Link>
					<a href="/expenses/raw">
						<FaDownload />
						<span>Load Raw Data</span>
					</a>
				</section>
				{hasExpenses && <ExpensesList expenses={expenses} />}
				{!hasExpenses && (
					<section id="no-expenses">
						<h1>No expense found</h1>
						<p>
							Start <Link to="add">adding some!</Link>!
						</p>
					</section>
				)}
			</main>
		</>
	);
}

// return array of expenses
export async function loader({ request }) {
	//console.log("EXPENSES LOADER");

	// redirect if no user session and stop the rest of the loader
	const userId = await requireUserSession(request);

	const expenses = await getExpenses(userId);

	// not helpful because it removes the possibility to add expense
	// if (!expenses || expenses.length === 0) {
	// 	// trigger the closest CatchBoundary
	// 	throw json(
	// 		{ message: "Could not find any expenses." },
	// 		{ status: 404, statusText: "No expenses found" }
	// 	);
	// }
	// return expenses;
	return json(expenses, {
		headers: {
			"Cache-Control": "max-age=3",
		},
	});
}

// second way of doing it by sending json and useLoaderData will transform data
// export async function loader() {
// 	const expenses = await getExpenses();
// 	return json(expenses);
// }

// closer catchboundary that the root one
// export function CatchBoundary() {
// 	return <p>Error</p>;
// }

export function headers({ actionHeaders, loaderHeaders, parentHeaders }) {
	return {
		"Cache-Control": loaderHeaders.get("Cache-Control"), // 3 minutes
	};
}
