import React, { FC, useCallback, useState } from "react";
import { Button, Divider, HelperText, List, Modal, Portal, Text, TextInput } from "react-native-paper";
import { LocalizationKey, i18n } from "@/Localization";
import { useWalletIcon } from "@/Hooks/icon";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors } from "@/Theme";
import { Wallet } from "@/Services/wallets";
import { SelectWallet } from "@/Components/SelectWallet";
import { InputAmount } from "@/Components/InputAmount";
import { useFormattedDate } from "@/Hooks/date";

interface Props {
    wallet: Wallet
}

export const TransferMoney: FC<Props> = ({ wallet }) => {

    const [walletName, walletIcon, walletColor] = useWalletIcon(wallet.type);

    const today = new Date();
    const [amount, setAmount] = useState('0');
    const [fromWalletId, setFromWalletId] = useState(wallet.id);
    const [toWalletId, setToWalletId] = useState(1);
    const [date, setDate] = useState(today);

    const [inputAmountVisible, setInputAmountVisible] = useState(false);
    const [selectFromVisible, setSelectFromVisible] = useState(false);
    const [selectToVisible, setSelectToVisible] = useState(false);
    const [selectDateVisible, setSelectDateVisible] = useState(false);

    // useFocusEffect(
    //     useCallback(() => {
    //         // http get wallet from id
    //         // setFromWalletId(id)
    //         // setToWalletId(id)
    //     }, [fromWalletId])
    // );

    function changeFromWallet() {
        setSelectFromVisible(true);
    }

    function changeToWallet() {
        console.log("To");
        
        setSelectToVisible(true);
    }

    function changeDate() {
        console.log("Stop");
        setSelectDateVisible(true);
    }

    function onConfirm() {

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
                        {amount ? parseFloat(amount).toLocaleString('en') : '...'}
                    </Text>
                </TouchableOpacity>
                
            </View>
            <Divider />
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.FROM)}</List.Subheader>
                <List.Item
                    left={(props) => <List.Icon {...props} icon={walletIcon} color={walletColor} />}
                    title={i18n.t(LocalizationKey.CASH)}
                    onPress={changeFromWallet}
                />
            </List.Section>
            <Divider />
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.TO)}</List.Subheader>
                <List.Item
                    left={(props) => <List.Icon {...props} icon="checkbox-blank-circle" />}
                    title={i18n.t(LocalizationKey.SELECT_WALLET)}
                    onPress={changeToWallet}
                />
            </List.Section>
            <Divider />
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
            </List.Section>
            <Button 
                mode="contained" 
                buttonColor={Colors.PRIMARY}
                onPress={onConfirm}
                style={{ width: 120, paddingVertical: 10, marginHorizontal: 'auto' }}
            >
                {i18n.t(LocalizationKey.SAVE)}
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
                    walletId={fromWalletId}
                    setWalletId={setFromWalletId}
                />
                <SelectWallet
                    visible={selectToVisible}
                    setVisible={setSelectToVisible}
                    walletId={toWalletId}
                    setWalletId={setToWalletId}
                />
                <DateTimePickerModal
                    isVisible={selectDateVisible}
                    mode="date"
                    onConfirm={(date) => {
                        setDate(date);
                        setSelectDateVisible(false);
                    }}
                    onCancel={() => setSelectDateVisible(false)}
                />
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