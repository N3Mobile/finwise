import { useCategoryIcon } from "@/Hooks/icon";
import { LocalizationKey, i18n } from "@/Localization";
import { Transaction } from "@/Services/transactions";
import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";

interface IRecentProps {
    transactions: Transaction[]
}

export const Recent = ({ transactions }: IRecentProps) => {

    return (
        <List.Section>
            <List.Subheader>{i18n.t(LocalizationKey.RECENT_TRANSACTIONS)}</List.Subheader>
            {/* TODO: Recent Transaction */}
        </List.Section>
    )
}