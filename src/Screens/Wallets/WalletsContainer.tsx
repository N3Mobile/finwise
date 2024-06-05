import React, { useCallback, useState } from "react";
import { Wallets } from "./Wallets";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { http } from "@/Hooks/api";
import { Wallet } from "@/Services/wallets";
import { ScreenWrapper } from "@/Components";
import { TabNavigation } from "@/Navigation/Main";
import { TabScreens } from "..";
import { useUser } from "@/Components/UserContext";

export const WalletsContainer = () => {
    
    const { userId } = useUser();
    const navigation = useNavigation<TabNavigation>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [wallets, setWallets] = useState<Wallet[]>([]);

    useFocusEffect(
        useCallback(() => {
            setError("");
            http.get("wallets/byUsersId", { user_ID: userId })
                .then(data => {
                    setWallets(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.toString());                
                });
        }, [])
    );

    return (
        <ScreenWrapper
            loading={loading}
            error={error}
            backToHome={() => { navigation.navigate(TabScreens.HOME); }}
        >
            <Wallets 
                wallets={wallets} 
                setWallets={setWallets} 
                setLoading={setLoading}
                setError={setError}
            />
        </ScreenWrapper>
    );
}