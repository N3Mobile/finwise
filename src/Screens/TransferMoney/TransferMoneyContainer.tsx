import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react"
import { RootScreens } from "..";
import { TransferMoney } from "./TransferMoney";

type Props = NativeStackScreenProps<RootStackParamList, RootScreens.TRANSFER_MONEY>;

export const TransferMoneyContainer: FC<Props> = ({ route }) => {

    const walletId = route.params.wallet_id;

    const sampleWallet = {
        id: 7,
        user_id: 1,
        type: "card",
        name: "A card",
        amount: 3000
    };

    return (
        <TransferMoney wallet={sampleWallet} />
    )
}