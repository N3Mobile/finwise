import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { RootScreens } from "..";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, HelperText, Icon, List, Text, TextInput } from "react-native-paper";
import { LocalizationKey, i18n } from "@/Localization";
import { Colors } from "@/Theme";
import { useWalletIcon } from "@/Hooks/icon";
import { EditWallet } from "./EditWallet";

type Props = NativeStackScreenProps<RootStackParamList, RootScreens.EDIT_WALLET>;

export const EditWalletContainer: FC<Props> = ({ route }) => {

    const sampleWallet = {
        id: 7,
        user_id: 1,
        type: "card",
        name: "A card",
        amount: 3000
    };

    return <EditWallet wallet={sampleWallet} />
}