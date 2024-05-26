import { API } from "../base"

export interface Wallet {
    id: number,
    user_id: number,
    type: string,
    name: string,
    amount: number
}

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