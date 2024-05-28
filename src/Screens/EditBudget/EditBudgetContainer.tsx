import React from "react";
import { EditBudget } from "./EditBudget";

export const EditBudgetContainer = () => {

    const fakeBudget = {
        id: 3,
        name: "Entertainment",
        wallet_id: 1,
        category: "bill",
        initial_amount: 2000000,
        amount: 4000,
        start_date: '27/05/2024',
        end_date: '02/06/2024'
    };

    return (
        <EditBudget budget={fakeBudget} />
    )
}