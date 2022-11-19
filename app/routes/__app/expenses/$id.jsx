import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
// import { getExpense } from "~/data/expenses.server";

export default function UpdateExpensePage() {
	const navigate = useNavigate();

	const closeHandler = () => {
		// navigate to parent page /expenses
		navigate("..");
	};
	return (
		<Modal onClose={closeHandler}>
			<ExpenseForm />
		</Modal>
	);
}

// extra request - we will use the data from expenses in ExpenseForm with useMatches()
// export async function loader({ request, params }) {
// 	console.log("EXPENSE ID LOADER");
// 	const expenseId = params.id;
// 	return await getExpense(expenseId);
// }

export async function action({ params, request }) {
	const expenseId = params.id;

	if (request.method === "PATCH") {
		const formData = await request.formData();
		const expenseData = Object.fromEntries(formData);

		//validate data
		try {
			validateExpenseInput(expenseData);
		} catch (error) {
			// show user error messages
			return error;
		}

		await updateExpense(expenseId, expenseData);
		return redirect("/expenses");
	} else if (request.method === "DELETE") {
		await deleteExpense(expenseId);
		return { deletedId: expenseId };
	}
}

// add title depending on expense title
export function meta({ params, location, data, parentsData }) {
	// window.location, data : loaderdata
	const expense = parentsData["routes/__app/expenses"].find(
		(expense) => expense.id === params.id
	);
	return {
		title: expense.title,
		description: "Manage your expense",
	};
}
