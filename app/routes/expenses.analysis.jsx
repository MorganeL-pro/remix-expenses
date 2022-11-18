import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import expensesStyles from "~/styles/expenses.css";

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

export default function ExpensesAnalysisPage() {
	return (
		<main>
			<Chart expenses={DUMMY_EXPENSES} />
			<ExpenseStatistics expenses={DUMMY_EXPENSES} />
		</main>
	);
}

export function links() {
	return [{ rel: "stylesheet", href: expensesStyles }];
}
