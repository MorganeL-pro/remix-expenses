// /expenses => shared layout

import { Outlet } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";

const DUMMY_EXPENSES = [
	{
		id: "e1",
		title: "First Expense",
		amount: 12.99,
		date: new Date().toISOString(),
	},
	{
		id: "e1=2",
		title: "Second Expense",
		amount: 25.99,
		date: new Date().toISOString(),
	},
];

export default function ExpensesLayout() {
	return (
		<>
			<Outlet />
			<main>
				<ExpensesList expenses={DUMMY_EXPENSES} />
			</main>
		</>
	);
}
