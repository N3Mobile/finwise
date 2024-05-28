import { useCategoryIcon } from "@/Hooks/icon";
import { LocalizationKey, i18n } from "@/Localization";
import { Budget } from "@/Services/budgets";
import { Colors } from "@/Theme";
import React, { FC } from "react";
import { View } from "react-native";
import { Button, List, ProgressBar, Text } from "react-native-paper";

interface Props {
    budget: Budget,
    onShowTransactions: () => void
}

export const BudgetDetails: FC<Props> = ({ budget, onShowTransactions }) => {
    const [catname, caticon, catcolor] = useCategoryIcon(budget.category);
    const [walletName, walletIcon, walletColor] = ['CASH CASH', 'cash', Colors.PRIMARY70];
    // const [walname, walicon, walcolor] = useWalletIcon(budget.wallet_id);

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
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{Number(123000000).toLocaleString('en')}</Text>
                        </View>
                        <View style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center'
                        }}>
                            <Text>{i18n.t(LocalizationKey.LEFT)}</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{Number(123000000).toLocaleString('en')}</Text>
                        </View>
                    </View>
                    <ProgressBar progress={0.7} color={Colors.PRIMARY70}/>
                </View>
            </List.Section>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.TIME)}</List.Subheader>
                <List.Item 
                    title={'01/05 - 31/05'}
                    left={(props) => <List.Icon {...props} icon={"calendar"} color={Colors.PRIMARY70}/>}
                    description={"5 " + i18n.t(LocalizationKey.DAYS) + " " + i18n.t(LocalizationKey.LEFT)}
                />
            </List.Section>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.WALLET)}</List.Subheader>
                <List.Item
                    title={walletName}
                    left={(props) => <List.Icon {...props} icon={walletIcon} color={walletColor}/>}
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