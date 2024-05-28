import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Dashboard } from "./Dashboard";
import { BudgetItem } from "./BudgetItem";
import { RootScreens } from "..";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/Navigation";
import { parseDate } from "@/Hooks/date";
import { PeriodType } from "@/Config/period";

export const BudgetsContainer = () => {
    const navigation = useNavigation<StackNavigation>();
    const budgets = [
        {
        id: 1,
        name: "Entertainment",
        wallet_id: 1,
        category: "entertainment",
        initial_amount: 1000000,
        amount: 50000,
        start_date: "27/05/2024",
        end_date: "02/06/2024",
    },
    {
        id: 2,
        name: "Entertainment",
        wallet_id: 1,
        category: "bill",
        initial_amount: 2000000,
        amount: 1000000,
        start_date: "27/05/2024",
        end_date: "02/06/2024",
    },
    {
        id: 3,
        name: "Entertainment",
        wallet_id: 1,
        category: "bill",
        initial_amount: 2000000,
        amount: 4000,
        start_date: "27/05/2024",
        end_date: "02/06/2024",
    },
    {
        id: 4,
        name: "Entertainment",
        wallet_id: 1,
        category: "bill",
        initial_amount: 2000000,
        amount: 3,
        start_date: "27/05/2024",
        end_date: "02/06/2024",
    },
  ];

  const [walletId, setWalletId] = useState(1);
  const [period, setPeriod] = useState(PeriodType.MONTH);
  
//   useEffect(() => {
//     // TODO: get wallet
//   }, [walletId]);

    const sampleWallet = {
        id: 1,
        user_id: 1,
        type: "ewallet",
        name: "test",
        amount: 1000000
    }

    return (
        <FlatList
            data={budgets.filter(bud => {
                const today = (new Date()).getTime();
                const start = parseDate(bud.start_date).getTime();
                const end = parseDate(bud.end_date).getTime();
                return today >= start && today <= end;
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
                    wallet={sampleWallet}
                    setWalletId={setWalletId}
                    addBudget={() => navigation.navigate(RootScreens.ADD_BUDGET)}
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
