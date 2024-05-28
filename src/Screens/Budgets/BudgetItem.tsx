import { useCategoryIcon } from "@/Hooks/icon";
import { LocalizationKey, i18n } from "@/Localization";
import { Budget } from "@/Services/budgets";
import { Colors, MyTheme } from "@/Theme";
import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, ProgressBar, Text } from "react-native-paper";

interface Props {
    budget: Budget,
    showDetails: (budgetId: number) => void
}

export const BudgetItem: FC<Props> = ({ budget, showDetails }) => {
    const [name, icon, color] = useCategoryIcon(budget.category);
    const overspent = budget.amount < 0;

    return (
        <TouchableOpacity style={styles.container} onPress={() => showDetails(budget.id)}>
            <View style={styles.upper}>
                <View style={styles.title}>
                    <Icon source={icon} color={color} size={50}/>
                    <Text style={{ marginLeft: 10 }}>{name}</Text>
                </View>
                <View style={styles.amount}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{budget.initial_amount.toLocaleString('en')}</Text>
                    <Text>{i18n.t(LocalizationKey.LEFT) + " " + budget.amount.toLocaleString('en')}</Text>
                </View>
            </View>
            <ProgressBar progress={(budget.initial_amount - budget.amount) / budget.initial_amount} color={overspent ? MyTheme.RED : Colors.PRIMARY70}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 10
    },
    upper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    amount: {
        alignItems: 'flex-end',
        paddingVertical: 10
    }
})