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
    walletId: string,
    setSelectVisible: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string>>
}

export const FinishedBudgets: FC<Props> = ({ walletId, setSelectVisible, setLoading, setError }) => {

    const navigation = useNavigation<StackNavigation>();

    const [budgets, setBudgets] = useState<Budget[]>([]);

    useFocusEffect(
        useCallback(() => {
            setSelectVisible(false);
            http.get('budgets/ranges', { wallet_id: walletId})
                .then(data => {
                    console.log(data);
                    setBudgets(data);
                })
                .catch(error => setError(error.toString()));
        }, [])
    );

    const periods = [...new Set(budgets.map(bud => {
        return JSON.stringify({
            start: bud.start_date,
            end: bud.end_date
        });
    }))].map(str => JSON.parse(str));

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
                                budgets
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