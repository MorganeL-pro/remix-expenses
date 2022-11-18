import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

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
