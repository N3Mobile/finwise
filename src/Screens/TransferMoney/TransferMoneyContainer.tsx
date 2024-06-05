import { RootStackParamList, StackNavigation } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useCallback, useState } from "react"
import { RootScreens, TabScreens } from "..";
import { TransferMoney } from "./TransferMoney";
import { ScreenWrapper } from "@/Components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { http } from "@/Hooks/api";
import { Wallet } from "@/Services/wallets";
import { useUser } from "@/Components/UserContext";

type Props = NativeStackScreenProps<RootStackParamList, RootScreens.TRANSFER_MONEY>;

export const TransferMoneyContainer: FC<Props> = ({ route }) => {

    const logerror = console.error;
    console.error = (...args: any) => {
        if (/defaultProps/.test(args[0])) return;
        logerror(...args);
    };

    const { userId } = useUser();
    const navigation = useNavigation<StackNavigation>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [wallets, setWallets] = useState<Wallet[]>([]);

    useFocusEffect(
        useCallback(() => {
            http.get('wallets/byUsersId', { user_ID: userId })
                .then(data => {
                    setWallets(data);
                    setLoading(false);
                })
                .catch(error => setError(error.toString()));
        }, [])
    );

    return (
        <ScreenWrapper
            loading={loading}
            error={error}
            backToHome={() => { navigation.navigate(RootScreens.MAIN, { screen: TabScreens.HOME }) }}
        >
            <TransferMoney 
                wallets={wallets}
                walletId={route.params.wallet_id} 
                setLoading={setLoading}
                setError={setError}
            />
        </ScreenWrapper>
    )
}