import React, { useState } from "react";
import { AddWallet } from "./AddWallet";
import { ScreenWrapper } from "@/Components";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/Navigation";
import { RootScreens, TabScreens } from "..";

export const AddWalletContainer = () => {

    const navigation = useNavigation<StackNavigation>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    return (
        <ScreenWrapper
            loading={loading}
            error={error}
            backToHome={() => { navigation.navigate(RootScreens.MAIN, { screen: TabScreens.HOME }); }}
        >
            <AddWallet setLoading={setLoading} setError={setError}/>
        </ScreenWrapper>
    )
}