import { EmptyIllustration } from "@/Components/EmptyIllustration";
import { SelectWallet } from "@/Components/SelectWallet";
import { http } from "@/Hooks/api";
import { Language, LocalizationKey, i18n } from "@/Localization";
import { DEFAULT_WALLET, Wallet } from "@/Services/wallets";
import { Colors, MyTheme } from "@/Theme";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Appbar, Button, List, Portal, Text } from "react-native-paper";
import { FinishedBudgets } from "./FinishedBudgets";
import { ScreenWrapper } from "@/Components";
import { RootStackParamList, StackNavigation } from "@/Navigation";
import { RootScreens, TabScreens } from "..";
import { CustomAppbar } from "@/Navigation/Appbar/CustomAppbar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useWalletIcon } from "@/Hooks/icon";

type Props = NativeStackScreenProps<RootStackParamList, RootScreens.FINISHED_BUDGET>;

export const FinishedBudgetsContainer: FC<Props> = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
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

    const [walname, walicon, walcolor] = useWalletIcon(wallet.type);

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
                    onPress={() => { navigation.navigate(RootScreens.MAIN, { screen: TabScreens.BUDGETS }); }}
                    style={{ paddingVertical: 10, width: 250 }}
                >
                    {i18n.t(LocalizationKey.VIEW_RUNNING_BUDGETS)}
                </Button>
            </View>
    </View> :
    <View>
        <List.Section>
            <List.Item
                title={wallet.name}
                left={(props) => <List.Icon {...props} icon={walicon} color={walcolor} />}
                onPress={() => setSelectVisible(true)}
                titleStyle={{ color: "white" }}
                style={{ 
                    backgroundColor: MyTheme.BLACK, 
                    borderRadius: 20, 
                    paddingVertical: 15, 
                    alignSelf: 'center',
                    marginHorizontal: 20
                }}
            />
        </List.Section>
        <FinishedBudgets
            walletId={selectedWalletId}
            setLoading={setLoading}
            setError={setError}
        />
    </View>;
    

    return (
        <ScreenWrapper
            loading={loading}
            error={error}
            backToHome={() => { navigation.navigate(RootScreens.MAIN, { screen: TabScreens.HOME }); }}
        >
            {content}
            <Portal>
                <SelectWallet
                    visible={selectVisible}
                    setVisible={setSelectVisible}
                    wallets={wallets}
                    walletId={selectedWalletId}
                    setWalletId={setSelectedWalletId}
                />
            </Portal>
        </ScreenWrapper>
    )
}