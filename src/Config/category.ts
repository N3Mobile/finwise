export const ExpenseCategory = {
    BILL: "bill",
    EDUCATION: "education",
    ENTERTAINMENT: "entertainment",
    FAMILY: "family",
    FOOD: "food",
    GIFT: "gift",
    HEALTH:  "health",
    INSURANCE: "insurance",
    INVESTMENT: "investment",
    OUTGOING_TRANSFER: "outgoing-transfer",
    PAY_INTEREST: "pay-interest",
    SHOPPING: "shopping",
    TRANSPORTATION: "transportation",
}

export const IncomeCategory = {
    COLLECT_INTEREST: "collect-interest",
    INCOMING_TRANSFER: "incoming-transfer",
    SALARY: "salary",
}

export const Category = { ...ExpenseCategory, ...IncomeCategory, ALL: "all", };
export type Category = typeof Category;

export const ALL_EXPENSE_CATEGORIES = Object.values(ExpenseCategory);
export const ALL_INCOME_CATEGORIES = Object.values(IncomeCategory);
export const ALL_CATEGORIES = Object.values(Category);