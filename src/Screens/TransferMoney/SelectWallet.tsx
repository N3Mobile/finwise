import { Wallet } from "@/Services/wallets";
import React, { Dispatch, FC, SetStateAction } from "react";
import { FlatList, View } from "react-native";
import { Divider } from "react-native-paper";
import { SelectWalletItem } from "./SelectWalletItem";

interface Props {
    walletId: number | null,
    setWalletId: Dispatch<SetStateAction<number | null>>
}

export const SelectWallet: FC<Props> = ({ walletId, setWalletId }) => {

    const wallets: Array<Wallet> = [
        {
            id: 1,
            user_id: 1,
            type: "cash",
            name: "Cash 1",
            amount: 1000
        },
        {
            id: 2,
            user_id: 1,
            type: "cash",
            name: "Cash 2",
            amount: 2000
        },
        {
            id: 3,
            user_id: 1,
            type: "card",
            name: "A card",
            amount: 3000
        }
    ]

    return (
        <FlatList 
            data={wallets}
            renderItem={({ item }) => 
                <SelectWalletItem 
                    wallet={item} 
                    selected={item.id === walletId}
                    onPress={() => setWalletId(item.id)}
                />
            }
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={Divider}
        />
    )
}