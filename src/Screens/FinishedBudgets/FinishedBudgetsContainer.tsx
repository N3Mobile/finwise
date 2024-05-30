import { EmptyIllustration } from "@/Components/EmptyIllustration";
import { SelectWallet } from "@/Components/SelectWallet";
import { http } from "@/Hooks/api";
import { Language, LocalizationKey, i18n } from "@/Localization";
import { DEFAULT_WALLET, Wallet } from "@/Services/wallets";
import { Colors } from "@/Theme";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Button, Portal, Text } from "react-native-paper";
import { FinishedBudgets } from "./FinishedBudgets";
import { ScreenWrapper } from "@/Components";
import { StackNavigation } from "@/Navigation";
import { RootScreens, TabScreens } from "..";

export const FinishedBudgetsContainer = () => {

    const navigation = useNavigation<StackNavigation>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [selectVisible, setSelectVisible] = useState(false);
    const [selectedWalletId, setSelectedWalletId] = useState("");
    const [wallet, setWallet] = useState(DEFAULT_WALLET);

    useFocusEffect(
        useCallback(() => {
            setError("");
            http.get('wallets/byUsersId', { user_ID: "66237fef97705968270a6dab" })
                .then(data => {
                    setWallets(data);
                })
                .catch(error => setError(error.toString()));
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            if (selectedWalletId) {
                http.get('wallets/byWalletsId', { _id: selectedWalletId })
                    .then(data => {
                        setWallet(data);
                    })
                    .catch(error => setError(error.toString()));
            } else {
                console.log("Where wallet id?");
                
            }
        }, [selectedWalletId])
    );

    const content = selectedWalletId === "" ?
    <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        height: '100%'
    }}>
        <EmptyIllustration />
        { i18n.locale === Language.ENGLISH ?
        <View style={{ alignItems: 'center' }}>
            <Text>No wallet selected</Text>
            <Text>Please select one to proceed</Text>
        </View> :
        <View style={{ alignItems: 'center' }}>
            <Text>Bạn chưa chọn ví</Text>
            <Text>Hãy chọn ví để tiếp tục</Text>
        </View> 
        }
        <Button 
            mode="contained" 
            buttonColor={Colors.PRIMARY70} 
            onPress={() => setSelectVisible(true)}
            style={{ paddingVertical: 10, width: 200 }}
        >
            {i18n.t(LocalizationKey.SELECT_WALLET)}
        </Button>
        <Portal>
            <SelectWallet
                visible={selectVisible}
                setVisible={setSelectVisible}
                wallets={wallets}
                walletId={selectedWalletId}
                setWalletId={setSelectedWalletId}
            />
        </Portal>
    </View> :
    <FinishedBudgets
    />;

    return (
        <ScreenWrapper
            loading={loading}
            error={error}
            backToHome={() => { navigation.navigate(RootScreens.MAIN, { screen: TabScreens.HOME }); }}
        >
            {content}
        </ScreenWrapper>
    )
}