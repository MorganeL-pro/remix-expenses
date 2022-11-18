import {
	Form,
	Link,
	useActionData,
	useMatches,
	useParams,
	useTransition as useNavigation,
} from "@remix-run/react";

function ExpenseForm() {
	const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
	const validationErrors = useActionData();

	const navigation = useNavigation();
	const isSubmitting = navigation.state !== "idle";

	// doesn't work because we commented the loader from $id
	// const expenseData = useLoaderData();

	const params = useParams();

	const matches = useMatches();
	// get all the active routes from where we are (almost like get the props from a parent)
	console.log(matches);
	const expenses = matches.find(
		(match) => match.id === "routes/__app/expenses"
	).data;
	const expenseData = expenses.find((expense) => expense.id === params.id);

	if (params.id && !expenseData) {
		// if id is present but we can't find any related expense, it probably means that it's a invalid id
		return <p>Invalid Expense id</p>;
	}

	const defaultValues = expenseData
		? {
				title: expenseData.title,
				amount: expenseData.amount,
				date: expenseData.date,
		  }
		: {
				title: "",
				amount: "",
				date: "",
		  };

	return (
		<Form
			method={expenseData ? "patch" : "post"}
			className="form"
			id="expense-form"
		>
			<p>
				<label htmlFor="title">Expense Title</label>
				<input
					type="text"
					id="title"
					name="title"
					required
					maxLength={30}
					defaultValue={defaultValues.title}
				/>
			</p>

			<div className="form-row">
				<p>
					<label htmlFor="amount">Amount</label>
					<input
						type="number"
						id="amount"
						name="amount"
						min="0"
						step="0.01"
						required
						defaultValue={defaultValues.amount}
					/>
				</p>
				<p>
					<label htmlFor="date">Date</label>
					<input
						type="date"
						id="date"
						name="date"
						max={today}
						required
						defaultValue={
							defaultValues.date ? defaultValues.date.slice(0, 10) : ""
						}
					/>
				</p>
			</div>
			{validationErrors && (
				<ul>
					{Object.values(validationErrors).map((error) => (
						<li key={error}>{error}</li>
					))}
				</ul>
			)}
			<div className="form-actions">
				<button disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : "Save Expense"}
				</button>
				<Link to="..">Cancel</Link>
			</div>
		</Form>
	);
}

export default ExpenseForm;
