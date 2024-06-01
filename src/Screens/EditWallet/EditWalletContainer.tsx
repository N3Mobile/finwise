import { RootStackParamList, StackNavigation } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useCallback, useState } from "react";
import { RootScreens, TabScreens } from "..";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, HelperText, Icon, List, Text, TextInput } from "react-native-paper";
import { LocalizationKey, i18n } from "@/Localization";
import { Colors } from "@/Theme";
import { useWalletIcon } from "@/Hooks/icon";
import { EditWallet } from "./EditWallet";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { http } from "@/Hooks/api";
import { Wallet } from "@/Services/wallets";
import { ScreenWrapper } from "@/Components";

type Props = NativeStackScreenProps<RootStackParamList, RootScreens.EDIT_WALLET>;

export const EditWalletContainer: FC<Props> = ({ route }) => {

    const navigation = useNavigation<StackNavigation>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    return (
        <ScreenWrapper
            loading={loading}
            error={error}
            backToHome={() => {}}
        >
            <EditWallet 
                walletId={route.params.wallet_id}
                setLoading={setLoading}
                setError={setError}
            />
        </ScreenWrapper>
    )
}