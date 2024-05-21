export interface Transaction {
    id: number,
    wallet_id: number,
    category: string,
    amount: number,
    created_at: string,
    is_pay: boolean
}