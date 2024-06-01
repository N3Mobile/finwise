import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { Button, Divider, HelperText, List, Modal, Portal, Text, TextInput } from "react-native-paper";
import { LocalizationKey, i18n } from "@/Localization";
import { useWalletIcon } from "@/Hooks/icon";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors } from "@/Theme";
import { Wallet } from "@/Services/wallets";
import { SelectWallet } from "@/Components/SelectWallet";
import { InputAmount } from "@/Components/InputAmount";
import { compareDate, useFormattedDate } from "@/Hooks/date";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { http } from "@/Hooks/api";
import { Category } from "@/Config/category";
import { StackNavigation } from "@/Navigation";

interface Props {
    wallets: Wallet[],
    walletId: string,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string>>
}

export const TransferMoney: FC<Props> = ({ wallets, walletId, setLoading, setError }) => {

    const navigation = useNavigation<StackNavigation>();
    const today = new Date();

    const [amount, setAmount] = useState('0');
    const [fromWalletId, setFromWalletId] = useState(walletId);
    const [toWalletId, setToWalletId] = useState("");
    // const [date, setDate] = useState(today);

    const [fromName, setFromName] = useState("");
    const [toName, setToName] = useState("");
    const [fromType, setFromType] = useState("");
    const [toType, setToType] = useState("");
    const [fromAmount, setFromAmount] = useState(0);

    const [inputAmountVisible, setInputAmountVisible] = useState(false);
    const [selectFromVisible, setSelectFromVisible] = useState(false);
    const [selectToVisible, setSelectToVisible] = useState(false);
    const [selectDateVisible, setSelectDateVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {    
            http.get('wallets/byWalletsId', { _id: fromWalletId })
                .then(data => {
                    setFromName(data.name);
                    setFromType(data.type);
                    setFromAmount(data.amount);
                })
                .catch(error => setError(error.toString()));
        }, [fromWalletId])
    );

    useFocusEffect(
        useCallback(() => {
            if (toWalletId !== "") {
                http.get('wallets/byWalletsId', { _id: toWalletId })
                    .then(data => {
                        setToType(data.type);
                        setToName(data.name);
                    })
                    .catch(error => setError(error.toString()));
            }
        }, [toWalletId])
    );

    const zeroAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) === 0;
    const notEnough = parseFloat(amount.replace(/[^0-9.]/g, '')) > fromAmount;
    const invalidToWallet = toWalletId === "";
    const invalid = zeroAmount || notEnough || invalidToWallet;

    function changeFromWallet() {
        setSelectFromVisible(true);
    }

    function changeToWallet() {    
        setSelectToVisible(true);
    }

    function changeDate() {
        setSelectDateVisible(true);
    }

    function onConfirm() {

        setLoading(true);
        Promise.all([
            http.post('transaction', {}, {
                wallet_id: fromWalletId,
                category: Category.OUTGOING_TRANSFER,
                amount: parseFloat(amount.replace(/[^0-9.]/g, '')),
                is_pay: true,
                note_info: `Transfer money to ${toName}`
            }),
            http.post('transaction', {}, {
                wallet_id: toWalletId,
                category: Category.INCOMING_TRANSFER,
                amount: amount,
                is_pay: false,
                note_info: `Transfer money from ${fromName}`
            })
        ]).then(([from, to]) => {
            setLoading(false);
            navigation.goBack();
        }).catch(([from, to]) => {
            from ? setError(from): setError(to);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.amount}>
                <Text style={{ fontSize: 20 }}>{i18n.t(LocalizationKey.AMOUNT)}</Text>
                <TouchableOpacity style={{
                    width: '100%',
                    backgroundColor: 'lightgray',
                    display: 'flex',
                    alignItems: 'center'
                }}
                onPress={() => setInputAmountVisible(true)}
                >
                    <Text style={{ fontSize: 40 }}>
                        {amount ? parseFloat(amount.replace(/[^0-9.]/g, '')).toLocaleString('en') : '...'}
                    </Text>
                </TouchableOpacity>
                <HelperText type="error" visible style={{ display: zeroAmount || notEnough ? 'flex' : 'none' }}>
                { zeroAmount
                ? i18n.t(LocalizationKey.ZERO_AMOUNT)
                : i18n.t(LocalizationKey.NOT_ENOUGH_MONEY)
                }
                </HelperText>
            </View>
            <Divider />
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.FROM)}</List.Subheader>
                <List.Item
                    left={(props) => {
                        const [name, icon, color] = useWalletIcon(fromType);
                        return <List.Icon {...props} icon={icon} color={color} />
                    }}
                    title={fromName}
                    onPress={changeFromWallet}
                />
            </List.Section>
            <Divider />
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.TO)}</List.Subheader>
                <List.Item
                    left={(props) => { 
                        const [name, icon, color] = useWalletIcon(toType)
                        return <List.Icon {...props} icon={icon} color={color} />
                    }}
                    title={toName ? toName : i18n.t(LocalizationKey.SELECT_WALLET)}
                    onPress={changeToWallet}
                />
                <HelperText type="error" visible style={{ display: invalidToWallet ? 'flex' : 'none' }}>
                    {i18n.t(LocalizationKey.WALLET_UNSELECTED)}
                </HelperText>
            </List.Section>
            {/* <Divider />
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.OPTIONS)}</List.Subheader>
                <List.Item
                    left={(props) => <List.Icon {...props} icon={"calendar"}/>}
                    title={date.getTime() === today.getTime() ? 
                        i18n.t(LocalizationKey.TODAY) : 
                        useFormattedDate(date)
                    }
                    onPress={changeDate}
                />
            </List.Section> */}
            <Button 
                mode="contained" 
                buttonColor={Colors.PRIMARY}
                onPress={onConfirm}
                disabled={invalid}
                style={{ width: 120, paddingVertical: 10, marginHorizontal: 'auto' }}
            >
                {i18n.t(LocalizationKey.CONFIRM)}
            </Button>
            
            <Portal>
                <InputAmount
                    visible={inputAmountVisible}
                    setVisible={setInputAmountVisible}
                    amount={amount}
                    setAmount={setAmount}
                />
                <SelectWallet
                    visible={selectFromVisible}
                    setVisible={setSelectFromVisible}
                    wallets={wallets}
                    walletId={fromWalletId}
                    setWalletId={setFromWalletId}
                />
                <SelectWallet
                    visible={selectToVisible}
                    setVisible={setSelectToVisible}
                    wallets={wallets}
                    walletId={toWalletId}
                    setWalletId={setToWalletId}
                />
                {/* <DateTimePickerModal
                    isVisible={selectDateVisible}
                    mode="date"
                    onConfirm={(date) => {
                        setDate(date);
                        setSelectDateVisible(false);
                    }}
                    onCancel={() => setSelectDateVisible(false)}
                /> */}
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    amount: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        gap: 10
    },
    action: {
        marginTop: 20,
        width: '50%',
        marginHorizontal: 'auto'
    }
});