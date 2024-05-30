import { InputAmount } from "@/Components/InputAmount";
import { SelectCategory } from "@/Components/SelectCategory";
import { SelectPeriod } from "@/Components/SelectPeriod";
import { SelectWallet } from "@/Components/SelectWallet";
import { Category } from "@/Config/category";
import { PeriodType } from "@/Config/period";
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
import { Appbar, Button, List, Portal } from "react-native-paper";

interface Props {
    wallets: Wallet[],
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string>>
}

export const AddBudget: FC<Props> = ({ wallets, setLoading, setError }) => {

    const navigation = useNavigation<StackNavigation>();

    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState('0');
    const [period, setPeriod] = useState(PeriodType.MONTH);
    const [walletId, setWalletId] = useState("");
    const [wallet, setWallet] = useState(DEFAULT_WALLET);
    
    const [catname, caticon, catcolor] = useCategoryIcon(category);
    const [walname, walicon, walcolor] = useWalletIcon(wallet.type);
    const [periodTitle, start, end, periodLeft] = usePeriod(period);

    const [selectCategory, setSelectCategory] = useState(false);
    const [selectWallet, setSelectWallet] = useState(false);
    const [inputAmount, setInputAmount] = useState(false);
    const [selectPeriod, setSelectPeriod] = useState(false);
    
    useFocusEffect(
        useCallback(() => {
            if (walletId) {
                http.get('wallets/byWalletsId', { _id: walletId })
                    .then(data => {
                        setWallet(data);
                    })
                    .catch(error => setError(error.toString()));
            } else {
                console.log("Where wallet id?");
            }
        }, [walletId])
    );

    function onSave() {
        http.post('budgets', {}, {
            name: "",
            wallet_id: walletId,
            category: category,
            amount: amount,
            start_date: useFormattedDate(start),
            end_date: useFormattedDate(end)
        }).then(data => {
            console.log("created?");
            navigation.goBack();
        }).catch(error => setError(error.toString()))
    }

    return (
        <View>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.CATEGORY)}</List.Subheader>
                <List.Item 
                    title={category ? catname: i18n.t(LocalizationKey.SELECT_CATEGORY)}
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
                    title={walletId ? wallet.name : i18n.t(LocalizationKey.SELECT_WALLET)}
                    left={(props) => <List.Icon {...props} icon={walicon} color={walcolor} />}
                    onPress={() => setSelectWallet(true)}
                />
            </List.Section>
            <Button
                mode="contained"
                buttonColor={Colors.PRIMARY70}
                onPress={onSave}
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