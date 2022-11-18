import { Link, useFetcher } from "@remix-run/react";

function ExpenseListItem({ id, title, amount }) {
	// programmatic submission for delete expense (equivalent to Form)
	//const submit = useSubmit();

	// function deleteExpenseItemHandler() {
	// 	submit(null, {
	// 		method: "delete",
	// 		action: `/expenses/${id}`,
	// 	});
	// }

	// useFetcher (gives a fetcher object) helps to submit without adding navigation (button when clicked)
	const fetcher = useFetcher();

	function deleteExpenseItemHandler() {
		// ask user
		const proceed = confirm("Are you sure to want to delete this item ?");
		if (!proceed) {
			return;
		}
		fetcher.submit(null, {
			method: "delete",
			action: `/expenses/${id}`,
		});
	}

	// can also be used for state of submit form to add feedback to user like useTransition (or useNavigation)
	if (fetcher.state !== "idle") {
		return (
			<artcle className="expense-item locked">
				<p>Deleting...</p>
			</artcle>
		);
	}

	// fetcher gives access to data that's been returned by the action of deleting
	// fetcher.data;

	return (
		<article className="expense-item">
			<div>
				<h2 className="expense-title">{title}</h2>
				<p className="expense-amount">${amount.toFixed(2)}</p>
			</div>
			<menu className="expense-actions">
				<button onClick={deleteExpenseItemHandler}>Delete</button>
				{/* <Form method="delete" action={`/expenses/${id}`}>
					<button>Delete</button>
				</Form> */}
				<Link to={id}>Edit</Link>
			</menu>
		</article>
	);
}

export default ExpenseListItem;
