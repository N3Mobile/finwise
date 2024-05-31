import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Dashboard } from "./Dashboard";
import { BudgetItem } from "./BudgetItem";
import { RootScreens } from "..";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { compareDate, parseDate, useFormattedDate, usePeriod } from "@/Hooks/date";
import { PeriodType } from "@/Config/period";
import { http } from "@/Hooks/api";
import { Wallet } from "@/Services/wallets";
import { Budget } from "@/Services/budgets";
import { StackNavigation } from "@/Navigation";

interface Props {
    selectedWalletId: string,
    setSelectedWalletId: Dispatch<SetStateAction<string>>,
    wallet: Wallet,
    allWallets: Wallet[],
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string>>
}

export const Budgets: FC<Props> = ({ selectedWalletId, setSelectedWalletId, wallet, allWallets, setLoading, setError }) => {

    const navigation = useNavigation<StackNavigation>();

    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [period, setPeriod] = useState(PeriodType.MONTH);
    const [title, start, end, left] = usePeriod(period);
    
    useFocusEffect(
        useCallback(() => {
            http.get('budgets/ranges', {
                wallet_id: selectedWalletId,
                start_date: useFormattedDate(start),
                end_date: useFormattedDate(end)
            }).then(data => {
                console.log(data);
                setBudgets(data);
            }).catch(error => setError(error.toString()));
        }, [selectedWalletId, period])
    );

    return (
        <FlatList
            data={budgets.filter(bud => {
                const today = new Date();
                return compareDate(today, start) >= 0 && compareDate(today, end) <= 0;
            })}
            renderItem={({ item }) =>
                <BudgetItem
                    budget={item}
                    showDetails={() => navigation.navigate(RootScreens.BUDGET_DETAILS, { budgetId: item.id })}
                />
            }
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={
                <Dashboard
                    totalAmount={budgets.reduce((total, bud) => total + bud.initial_amount, 0)}
                    totalSpent={budgets.reduce((total, bud) => total + bud.initial_amount - bud.amount, 0)}
                    period={period}
                    setPeriod={setPeriod}
                    wallets={allWallets}
                    wallet={wallet}
                    setWalletId={setSelectedWalletId}
                    addBudget={() => navigation.navigate(RootScreens.ADD_BUDGET, { walletId: wallet.id })}
                />
            }
        />
    // <View style={{ flex: 1 }}>
    //     <Dashboard
    //         totalAmount={2000000}
    //         totalSpent={1000000}
    //         timeRange="month"
    //         timeLeft={20}
    //         addBudget={() => navigation.navigate(RootScreens.ADD_BUDGET)}
    //     />
    //     <ScrollView nestedScrollEnabled={true}>
    //         {
    //             budgets.map(budget => 
    //                 <BudgetItem
    //                     key={budget.id.toString()}
    //                     budget={budget}
    //                     showDetails={() => navigation.navigate(RootScreens.BUDGET_DETAILS, { budgetId: budget.id })}
    //                 />
    //             )
    //         }
    //     </ScrollView>
    // </View>
    );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
});
