import { http } from "@/Hooks/api";
import { getPeriodType, parseDate, usePeriod } from "@/Hooks/date";
import { useCategoryIcon, useWalletIcon } from "@/Hooks/icon";
import { LocalizationKey, i18n } from "@/Localization";
import { Budget } from "@/Services/budgets";
import { DEFAULT_WALLET } from "@/Services/wallets";
import { Colors, MyTheme } from "@/Theme";
import { useFocusEffect } from "@react-navigation/native";
import React, { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { View } from "react-native";
import { Button, List, ProgressBar, Text } from "react-native-paper";

interface Props {
    budget: Budget,
    onShowTransactions: () => void,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string>>
}

export const BudgetDetails: FC<Props> = ({ budget, onShowTransactions, setLoading, setError }) => {

    const [wallet, setWallet] = useState(DEFAULT_WALLET);

    useFocusEffect(
        useCallback(() => {
            http.get('wallets/byWalletsId', { _id: budget.wallet_id })
                    .then(data => {
                        setWallet(data);
                    })
                    .catch(error => setError(error.toString()));
        }, [budget])
    )

    const [catname, caticon, catcolor] = useCategoryIcon(budget.category);
    const [walname, walicon, walcolor] = useWalletIcon(wallet.type);
    const period = getPeriodType(parseDate(budget.start_date), parseDate(budget.end_date));
    if (!period) {
        throw new Error("A custom period is used");
    }
    const [title, start, end, left] = usePeriod(period);
    const overspent = budget.amount < 0;

    return (
        <View>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.CATEGORY)}</List.Subheader>
                <List.Item
                    title={catname}
                    left={(props) => <List.Icon {...props} icon={caticon} color={catcolor} />}
                />
            </List.Section>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.TOTAL_BUDGET)}</List.Subheader>

                <View style={{ paddingHorizontal: 15 }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 10
                    }}>
                        <View style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <Text>{i18n.t(LocalizationKey.SPENT)}</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{(budget.initial_amount - budget.amount).toLocaleString('en')}</Text>
                        </View>
                        <View style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center'
                        }}>
                            <Text style={{ color: overspent ? MyTheme.RED : 'black' }}>
                                { overspent 
                                ? i18n.t(LocalizationKey.OVERSPENT)
                                : i18n.t(LocalizationKey.LEFT)
                                }
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                { overspent
                                ? (-budget.amount).toLocaleString('en')
                                : budget.amount.toLocaleString('en')
                                }
                            </Text>
                        </View>
                    </View>
                    <ProgressBar 
                        progress={(budget.initial_amount - budget.amount) / budget.initial_amount} 
                        color={ overspent ? MyTheme.RED :Colors.PRIMARY70}
                    />
                </View>
            </List.Section>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.TIME)}</List.Subheader>
                <List.Item 
                    title={`${budget.start_date} - ${budget.end_date}`}
                    left={(props) => <List.Icon {...props} icon={"calendar"} color={Colors.PRIMARY70}/>}
                    description={left + " " + (left > 1 ? i18n.t(LocalizationKey.DAYS) : i18n.t(LocalizationKey.DAY)) + " " + i18n.t(LocalizationKey.LEFT)}
                />
            </List.Section>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.WALLET)}</List.Subheader>
                <List.Item
                    title={wallet.name}
                    left={(props) => <List.Icon {...props} icon={walicon} color={walcolor}/>}
                />
            </List.Section>
            <Button
                mode="contained"
                buttonColor={Colors.PRIMARY70}
                onPress={onShowTransactions}
                style={{ width: 220, marginHorizontal: 'auto', paddingVertical: 10, marginTop: 20 }}
            >
                {i18n.t(LocalizationKey.TRANSACTION_LIST)}
            </Button>
        </View>
    )
}