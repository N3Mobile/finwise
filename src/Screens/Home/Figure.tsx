import { ExpenseIcon } from "@/Components/ExpenseIcon";
import { IncomeIcon } from "@/Components/IncomeIcon";
import { LocalizationKey, i18n } from "@/Localization";
import { Colors } from "@/Theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface IFigureProps {
    balance: number,
    income: number,
    expense: number
}

export const Figure = ({ balance, income, expense }: IFigureProps) => {

    const formatter = Intl.NumberFormat('en', { notation: 'compact' });

    return (
        <View style={styles.container}>
            <View style={styles.upper}>
                <Text style={{ fontSize: 20 }}>{i18n.t(LocalizationKey.CURRENT_BALANCE)}</Text>
                <Text style={styles.balance}>{balance.toLocaleString('en') + " ₫"}</Text>
            </View>
            <View style={styles.lower}>
                <View style={styles.expense}>
                    <ExpenseIcon />
                    <View style={styles.inner}>
                        <Text style={{ color: 'white', fontSize: 15 }}>{i18n.t(LocalizationKey.TOTAL_EXPENSE)}</Text>
                        <Text style={styles.inex}>{formatter.format(expense)}</Text>
                    </View>
                </View>
                <View style={styles.income}>
                    <IncomeIcon />
                    <View style={styles.inner}>
                        <Text style={{ color: 'white', fontSize: 15 }}>{i18n.t(LocalizationKey.TOTAL_INCOME)}</Text>
                        <Text style={styles.inex}>{formatter.format(income)}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'lightblue',
        alignItems: 'center'
    },
    upper: {
        alignItems: 'center',
        marginVertical: 20
    },
    lower: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 10,
        marginBottom: 20
    },
    balance: {
        fontSize: 40
    },
    expense: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        backgroundColor: Colors.ERROR60,
        padding: 15,
        borderRadius: 20,
        width: '40%'
    },
    income: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        backgroundColor: Colors.INVERSE_PRIMARY,
        padding: 15,
        borderRadius: 20,
        width: '40%',
    },
    inner: {

    },
    inex: {
        color: 'white',
        fontSize: 20
    }
})