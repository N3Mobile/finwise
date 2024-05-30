import React, { useCallback, useState } from "react";
import { AddBudget } from "./AddBudget";
import { ScreenWrapper } from "@/Components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/Navigation";
import { RootScreens, TabScreens } from "..";
import { Wallet } from "@/Services/wallets";
import { http } from "@/Hooks/api";

export const AddBudgetContainer = () => {

    const navigation = useNavigation<StackNavigation>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [wallets, setWallets] = useState<Wallet[]>([]);

    useFocusEffect(
        useCallback(() => {
            setError("");
            http.get('wallets/byUsersId', { user_ID: "66237fef97705968270a6dab" })
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
            <AddBudget
                wallets={wallets}
                setLoading={setLoading}
                setError={setError}
            />
        </ScreenWrapper>
    )
}