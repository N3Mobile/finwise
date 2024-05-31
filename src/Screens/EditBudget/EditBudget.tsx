import { InputAmount } from "@/Components/InputAmount";
import { SelectCategory } from "@/Components/SelectCategory";
import { SelectPeriod } from "@/Components/SelectPeriod";
import { SelectWallet } from "@/Components/SelectWallet";
import { http } from "@/Hooks/api";
import { getPeriodType, parseDate, useFormattedDate, usePeriod } from "@/Hooks/date";
import { useCategoryIcon, useWalletIcon } from "@/Hooks/icon";
import { LocalizationKey, i18n } from "@/Localization";
import { StackNavigation } from "@/Navigation";
import { Budget } from "@/Services/budgets";
import { DEFAULT_WALLET, Wallet } from "@/Services/wallets";
import { Colors } from "@/Theme";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { View } from "react-native";
import { Appbar, Button, HelperText, List, Portal } from "react-native-paper";

interface Props {
    budget: Budget,
    wallets: Wallet[],
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string>>
}

export const EditBudget: FC<Props> = ({ budget, wallets, setLoading, setError }) => {

    const navigation = useNavigation<StackNavigation>();

    const [category, setCategory] = useState(budget.category);
    const [amount, setAmount] = useState(budget.initial_amount.toLocaleString('en'));
    const [walletId, setWalletId] = useState(budget.wallet_id);
    const [wallet, setWallet] = useState(DEFAULT_WALLET);
    const [totalBudget, setTotalBudget] = useState(0);

    useFocusEffect(
        useCallback(() => {
            if (walletId) {
                Promise.all([
                    http.get('wallets/byWalletsId', { _id: walletId }),
                    http.get('budgets/ranges', { wallet_id: walletId })
                ]).then(([wal, buds]) => {
                    setWallet(wal);
                    const total = buds.reduce((total: number, bud: Budget) => total + bud.initial_amount, 0);
                    setTotalBudget(total);
                }).catch(error => setError(error.toString()));
            } else {
                console.log("Where wallet id?");
            }
        }, [walletId])
    );

    const invalidAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) === 0;
    const notEnough = parseFloat(amount.replace(/[^0-9.]/g, '')) + totalBudget > wallet.amount;
    const invalid = invalidAmount || notEnough;
    
    const [catname, caticon, catcolor] = useCategoryIcon(category);
    const [walname, walicon, walcolor] = useWalletIcon(wallet.type);

    const currentPeriod = getPeriodType(parseDate(budget.start_date), parseDate(budget.end_date));
    if (!currentPeriod) {
        throw new Error("A custom period is used");
    }
    const [period, setPeriod] = useState(currentPeriod);
    const [periodTitle, start, end, periodLeft] = usePeriod(period);

    const [selectCategory, setSelectCategory] = useState(false);
    const [selectWallet, setSelectWallet] = useState(false);
    const [inputAmount, setInputAmount] = useState(false);
    const [selectPeriod, setSelectPeriod] = useState(false);

    function onSave() {
        http.patch('budgets', {
            _id: budget.id,
            wallet_id: walletId,
            amount: parseFloat(amount.replace(/[^0-9.]/g, '')),
            category: category,
            start_date: useFormattedDate(start),
            end_date: useFormattedDate(end)
        }, null)
            .then(data => {
                console.log("updated");
                navigation.goBack();
            })
            .catch(error => setError(error.toString()));
    }

    return (
        <View>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.CATEGORY)}</List.Subheader>
                <List.Item 
                    title={catname}
                    left={(props) => <List.Icon {...props} icon={caticon} color={catcolor} />}
                    onPress={() => setSelectCategory(true)}
                />
            </List.Section>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.TOTAL_BUDGET)}</List.Subheader>
                <List.Item
                    title={parseFloat(amount.replace(/[^0-9.]/g, '')).toLocaleString('en')}
                    left={(props) => <List.Icon {...props} icon="cash-100" color={Colors.PRIMARY}/>}
                    onPress={() => setInputAmount(true)}
                    titleStyle={{ fontSize: 25 }}
                />
                <HelperText type="error" visible={true} style={{ display: invalid ? 'flex' : 'none' }}>
                    { invalidAmount
                    ? i18n.t(LocalizationKey.ZERO_AMOUNT)
                    : i18n.t(LocalizationKey.NOT_ENOUGH_MONEY)
                    }
                </HelperText>
            </List.Section>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.TIME)}</List.Subheader>
                <List.Item 
                    title={periodTitle}
                    description={`${periodLeft} ${periodLeft > 1 ? i18n.t(LocalizationKey.DAYS) : i18n.t(LocalizationKey.DAY)} ${i18n.t(LocalizationKey.LEFT)}`}
                    left={(props) => <List.Icon {...props} icon="calendar" />}
                    onPress={() => setSelectPeriod(true)}
                />
            </List.Section>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.WALLET)}</List.Subheader>
                <List.Item
                    title={wallet.name}
                    left={(props) => <List.Icon {...props} icon={walicon} color={walcolor} />}
                    onPress={() => setSelectWallet(true)}
                />
            </List.Section>
            <Button
                mode="contained"
                buttonColor={Colors.PRIMARY70}
                onPress={onSave}
                disabled={invalid}
                style={{ width: 120, marginHorizontal: 'auto', paddingVertical: 10, marginBottom: 20 }}
            >
                {i18n.t(LocalizationKey.SAVE)}
            </Button>
            <Portal>
                <SelectCategory 
                    visible={selectCategory}
                    setVisible={setSelectCategory}
                    all
                    income={false}
                    expense
                    setCategory={setCategory}
                />
                <SelectWallet
                    visible={selectWallet}
                    setVisible={setSelectWallet}
                    wallets={wallets}
                    walletId={walletId}
                    setWalletId={setWalletId}
                />
                <InputAmount
                    visible={inputAmount}
                    setVisible={setInputAmount}
                    amount={amount}
                    setAmount={setAmount}
                />
                <SelectPeriod
                    visible={selectPeriod}
                    setVisible={setSelectPeriod}
                    period={period}
                    setPeriod={setPeriod}
                />
            </Portal>
        </View>
    )
}