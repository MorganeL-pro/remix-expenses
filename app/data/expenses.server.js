import { prisma } from "./database.server";

// create an expense
export async function addExpense(expenseData) {
	try {
		return await prisma.expense.create({
			data: {
				title: expenseData.title,
				amount: +expenseData.amount,
				date: new Date(expenseData.date),
			},
		});
	} catch (error) {
		throw new Error("Failed to create expense.");
	}
}

// get all expenses
export async function getExpenses() {
	try {
		const expenses = await prisma.expense.findMany({
			orderBy: { date: "desc" },
		});
		return expenses;
	} catch (error) {
		throw new Error("Failed to fetch expenses.");
	}
}

// get one expense by its id
export async function getExpense(id) {
	try {
		const expense = await prisma.expense.findFirst({ where: { id } });
		return expense;
	} catch (error) {
		throw new Error("Failed to fetch expense.");
	}
}

// update expense with its id
export async function updateExpense(id, expenseData) {
	try {
		const expense = await prisma.expense.update({
			where: { id },
			data: {
				title: expenseData.title,
				amount: +expenseData.amount,
				date: new Date(expenseData.date),
			},
		});
		return expense;
	} catch (error) {
		throw new Error("Failed to update expense.");
	}
}

// delete expense by its id
export async function deleteExpense(id) {
	try {
		await prisma.expense.delete({
			where: { id },
		});
	} catch (error) {
		throw new Error("Failed to delete expense.");
	}
}
