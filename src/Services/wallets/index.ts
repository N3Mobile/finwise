import { API } from "../base";

export interface Wallet {
    id: string,
    user_id: string,
    type: string,
    name: string,
    amount: number
}
export const DEFAULT_WALLET: Wallet = { id: "", user_id: "", type: "", name: "", amount: 0 }

const walletApi = API.injectEndpoints({
    endpoints: build => ({
        getWallet: build.query<Wallet, number>({
            query: id => `wallets/${id}`
        }),
        getAllWallets: build.query<Wallet[], void>({
            query: () => `wallets`
        }),
        updateWallet: build.mutation<void, number>({
            query: id => `wallets/${id}`
        })
    }),
    overrideExisting: true
})

export const {
    useLazyGetWalletQuery,
    useGetAllWalletsQuery,
    useUpdateWalletMutation
} = walletApi;