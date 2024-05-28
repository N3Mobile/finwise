export interface Budget {
    id: number,
    name: string,
    wallet_id: number,
    category: string,
    initial_amount: number,
    amount: number,
    start_date: string,
    end_date: string
}