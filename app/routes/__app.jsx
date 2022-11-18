//pathless component to wrap all the files in __app folder with the same style without adding /app/expenses in the url

import { Outlet } from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css";

export default function ExpensesLayout() {
	return <Outlet />;
}

export function links() {
	return [{ rel: "stylesheet", href: expensesStyles }];
}
