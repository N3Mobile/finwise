import { ALL_EXPENSE_CATEGORIES } from "@/Config/category";
import { PeriodType } from "@/Config/period";
import { compareDate, parseDate, usePeriod } from "@/Hooks/date";
import { useCategoryIcon } from "@/Hooks/icon";
import { Language, LocalizationKey, i18n } from "@/Localization";
import { Transaction } from "@/Services/transactions";
import React from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { List, Text } from "react-native-paper";

interface IReportProps {
    expenseTransactions: Transaction[]
}

export const Report = ({ expenseTransactions }: IReportProps) => {

    console.log(expenseTransactions);
    
    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    const [title, start, end, left] = usePeriod(PeriodType.WEEK);

    console.log("TIME?");
    console.log(start);
    console.log(end);

    const transactions = expenseTransactions.filter(trans => {
        const created = parseDate(trans.created_at);
        return compareDate(created, start) >= 0 && compareDate(created, end) <= 0;
    });

    const range = [...Array(6).keys()].reduce((cur, index) => {
        const prev = cur[cur.length - 1];
        const date = new Date(prev);
        date.setDate(prev.getDate() + 1);
        cur.push(date);
        return cur;
    }, [start]);

    const totalSpent = transactions.reduce((total, trans) => total + trans.amount, 0);
    console.log(totalSpent);
    const topSpent = ALL_EXPENSE_CATEGORIES.map(cat => { 
        if (cat === "outgoing-transfer") {
            console.log("GO");
            
            console.log(transactions.filter(trans => trans.category === cat));
            console.log(transactions.filter(trans => trans.category === cat).reduce((total, trans) => total + trans.amount, 0));
            
            
        }
        return {
        category: cat,
        total: transactions.filter(trans => trans.category === cat).reduce((total, trans) => total + trans.amount, 0)
    }}).sort((x, y) => y.total - x.total);

    let labels;
    if (i18n.locale === Language.ENGLISH) {
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    } else {
        labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    }

    const screenWidth = Dimensions.get("window").width;
    const data = {
        labels: labels,
        datasets: [
            {
                data: range.map(date => 
                    transactions
                        .filter(trans => compareDate(parseDate(trans.created_at), date) === 0)
                        .reduce((total, trans) => total + trans.amount, 0)
                ),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: [i18n.t(LocalizationKey.EXPENSE)] // optional
    };

    return (
        <View>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.WEEK_EXPENSE)}</List.Subheader>
                <List.Item
                    title={totalSpent.toLocaleString('en') + " ₫"}
                    titleStyle={{ fontSize: 30 }}
                />
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    bezier
                    formatYLabel={(label) => formatter.format(parseFloat(label))}
                    yAxisSuffix=" ₫"
                    chartConfig={{
                        // backgroundColor: '#e26a00',
                        // backgroundGradientFrom: '#fb8c00',
                        // backgroundGradientTo: '#ffa726
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 16
                        },
                        propsForDots: {
                          r: "6",
                          strokeWidth: "2",
                          stroke: "#ffa726"
                        }
                    }}
                />
            </List.Section>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.TOP_EXPENSE)}</List.Subheader>
                {
                    topSpent.map(item => {

                        const [name, icon, color] = useCategoryIcon(item.category);
                        return (
                            <List.Item
                                key={item.category}
                                title={name}
                                description={item.total.toLocaleString('en') + " ₫"}
                                left={(props) => <List.Icon {...props} icon={icon} color={color} />}
                                right={(props) => <Text {...props}>{`${totalSpent === 0 ? 0 : Math.round(item.total / totalSpent * 100)}%`}</Text>}
                            />
                        )
                    })
                }
            </List.Section>
        </View>
    )
}