import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { requireUserSession } from "~/data/auth.server";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function AddExpensesPage() {
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

export async function action({ request }) {
	const userId = await requireUserSession(request);

	const formData = await request.formData();
	const expenseData = Object.fromEntries(formData);
	// console.log(expenseData, formData);

	//validate data
	try {
		validateExpenseInput(expenseData);
	} catch (error) {
		// show user error messages
		return error;
	}

	await addExpense(expenseData, userId);
	return redirect("/expenses");
}
