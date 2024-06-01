import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScreenWrapper } from "@/Components";
import { TabNavigation } from "@/Navigation/Main";
import { RootScreens, TabScreens } from "..";
import { Budgets } from "./Budgets";
import { DEFAULT_WALLET, Wallet } from "@/Services/wallets";
import { View } from "react-native";
import { Button, Portal, Text } from "react-native-paper";
import { SelectWallet } from "@/Components/SelectWallet";
import { http } from "@/Hooks/api";
import { Colors } from "@/Theme";
import { EmptyIllustration } from "@/Components/EmptyIllustration";
import { Language, LocalizationKey, i18n } from "@/Localization";
import { StackNavigation } from "@/Navigation";

export const BudgetsContainer = () => {
    const navigation = useNavigation<TabNavigation>();
    const stackNavigation = useNavigation<StackNavigation>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [selectVisible, setSelectVisible] = useState(false);
    const [selectedWalletId, setSelectedWalletId] = useState("");

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

    const [wallet, setWallet] = useState(DEFAULT_WALLET);

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
            <View style={{ alignItems: 'center', gap: 10 }}>
                <Button 
                    mode="contained" 
                    buttonColor={Colors.PRIMARY70} 
                    onPress={() => setSelectVisible(true)}
                    style={{ paddingVertical: 10, width: 250 }}
                >
                    {i18n.t(LocalizationKey.SELECT_WALLET)}
                </Button>
                <Button
                    mode="contained"
                    buttonColor={Colors.TERTIARY}
                    onPress={() => { stackNavigation.navigate(RootScreens.FINISHED_BUDGET, { walletId: "" }); }}
                    style={{ paddingVertical: 10, width: 250 }}
                >
                    {i18n.t(LocalizationKey.VIEW_FINISHED_BUDGETS)}
                </Button>
            </View>
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
        <Budgets
            selectedWalletId={selectedWalletId}
            setSelectedWalletId={setSelectedWalletId}
            wallet={wallet}
            allWallets={wallets}
            setLoading={setLoading}
            setError={setError}
        />;

    return (
        <ScreenWrapper
            loading={loading}
            error={error}
            backToHome={() => { navigation.navigate(TabScreens.HOME); }}
        >
            {content}
        </ScreenWrapper>
    )
};
