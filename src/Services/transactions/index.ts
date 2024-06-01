export interface Transaction {
    // id: number,
    wallet_id: string,
    category: string,
    amount: number,
    created_at: string,
    is_pay: boolean,
    note_info: string,
}