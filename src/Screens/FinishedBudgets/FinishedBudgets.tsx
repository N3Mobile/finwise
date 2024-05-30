import { http } from "@/Hooks/api";
import { useCategoryIcon, useWalletIcon } from "@/Hooks/icon";
import { Budget } from "@/Services/budgets";
import { Wallet } from "@/Services/wallets";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";
import { BudgetItem } from "../Budgets/BudgetItem";
import { StackNavigation } from "@/Navigation";
import { RootScreens } from "..";

interface Props {
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string>>
}

export const FinishedBudgets: FC<Props> = ({ setLoading, setError }) => {

    const navigation = useNavigation<StackNavigation>();

    // useFocusEffect(
    //     useCallback(() => {
    //         http.get('budgets/ranges', {
    //             wallet_id: 
    //             start_date: 
    //             end_date: 
    //         }).then(data => {
    //             console.log(data);

    //         }).catch(error => setError(error.toString()));
    //     }, [])
    // );
    const fakeBudgets: Budget[] = [...Array(9).keys()].map(index => { return {
        id: index.toString(),
        name: "buddy",
        wallet_id: "1",
        category: "shopping",
        initial_amount: 500000,
        amount: 50000,
        start_date: "27/05/2024",
        end_date: "02/06/2024"
    }})

    const periods = [...new Set(fakeBudgets.map(bud => {
        return JSON.stringify({
            start: bud.start_date,
            end: bud.end_date
        });
    }))].map(str => JSON.parse(str));

    // TODO
    return (
        <ScrollView>
            { 
                periods.map(period => {
                    const start = period.start;
                    const end = period.end;

                    return (
                        <List.Section key={start + end}>
                            <List.Subheader>{`${start} - ${end}`}</List.Subheader>
                            {
                                fakeBudgets
                                    .filter(bud => (bud.start_date === start && bud.end_date === end))
                                    .map(bud => 
                                        <BudgetItem
                                            key={bud.id}
                                            budget={bud}
                                            showDetails={() => { navigation.navigate(RootScreens.BUDGET_DETAILS, { budgetId: bud.id }); }}
                                        />
                                    )
                            }
                        </List.Section>
                    );
                })
            }
        </ScrollView>
    )
}