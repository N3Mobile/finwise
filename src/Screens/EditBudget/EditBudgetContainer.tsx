import React, { FC, useCallback, useState } from "react";
import { EditBudget } from "./EditBudget";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens, TabScreens } from "..";
import { ScreenWrapper } from "@/Components";
import { useFocusEffect } from "@react-navigation/native";
import { http } from "@/Hooks/api";
import { DEFAULT_BUDGET } from "@/Services/budgets";
import { Wallet } from "@/Services/wallets";
import { useUser } from "@/Components/UserContext";

type Props = NativeStackScreenProps<RootStackParamList, RootScreens.EDIT_BUDGET>;

export const EditBudgetContainer: FC<Props> = ({ navigation, route }) => {

    const { userId } = useUser();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [budget, setBudget] = useState(DEFAULT_BUDGET);
    const [wallets, setWallets] = useState<Wallet[]>([]);
    useFocusEffect(
        useCallback(() => {
            setError("");

            Promise.all([
                http.get('budgets/ids', { _id: route.params.budgetId }),
                http.get('wallets/byUsersId', { user_ID: userId })
            ]).then(([bud, wals]) => {
                setBudget(bud);
                setWallets(wals);
                setLoading(false);
            }).catch(error => setError(error.toString()));
        }, [])
    );

    return (
        <ScreenWrapper
            loading={loading}
            error={error}
            backToHome={() => { navigation.navigate(RootScreens.MAIN, { screen: TabScreens.HOME }) }}
        >
            <EditBudget
                budget={budget}
                wallets={wallets}
                setLoading={setLoading}
                setError={setError}
            />
        </ScreenWrapper>
    )
}