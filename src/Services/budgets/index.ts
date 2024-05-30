export interface Budget {
    id: string,
    name: string,
    wallet_id: string,
    category: string,
    amount: number,
    start_date: string,
    end_date: string
}
export const DEFAULT_BUDGET: Budget = {
    id: "",
    name: "",
    wallet_id: "",
    category: "",
    initial_amount: 0,
    amount: 0,
    start_date: "",
    end_date: ""
}