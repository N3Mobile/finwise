import { InputAmount } from "@/Components/InputAmount";
import { SelectWalletType } from "@/Components/SelectWalletType";
import { WalletType } from "@/Config/wallet";
import { useWalletIcon } from "@/Hooks/icon";
import { LocalizationKey, i18n } from "@/Localization";
import { Wallet } from "@/Services/wallets";
import { Colors } from "@/Theme";
import React, { FC, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, HelperText, Icon, List, Portal, Text, TextInput } from "react-native-paper";

export const AddWallet = () => {

    const [name, setName] = useState('');
    const [type, setType] = useState(WalletType.CASH);
    const [balance, setBalance] = useState('0');
    const [selectWalletType, setSelectWalletType] = useState(false);
    const [inputAmount, setInputAmount] = useState(false);

    const [walname, walicon, walcolor] = useWalletIcon(type);

    function onConfirm() {

    }

    return (
        <View style={styles.container}>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.NAME)}</List.Subheader>
                <View>
                <TextInput 
                    label={i18n.t(LocalizationKey.NAME)}
                    value={name}
                    error={!name}
                    onChangeText={(text) => setName(text)}
                    outlineColor={Colors.PRIMARY}
                    underlineColor={Colors.PRIMARY}
                    activeOutlineColor={Colors.PRIMARY}
                    activeUnderlineColor={Colors.PRIMARY}
                    style={{ fontSize: 20, marginHorizontal: 10 }}
                    multiline
                />
                <HelperText type="error" visible={!name}>
                    {i18n.t(LocalizationKey.ERROR_EMPTY)}
                </HelperText>
            </View>
            </List.Section>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.TYPE)}</List.Subheader>
                <List.Item
                    title={walname}
                    left={() => <Icon source={walicon} color={walcolor} size={50} />}
                    onPress={() => setSelectWalletType(true)}
                    style={{ paddingLeft: 10 }}
                    titleStyle={{ fontSize: 20 }}
                />
            </List.Section>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.BALANCE)}</List.Subheader>
                <List.Item
                    title={parseFloat(balance.replace(/[^0-9.]/g, '')).toLocaleString('en')}
                    left={() => <Icon source="cash-100" color={Colors.PRIMARY70} size={50}/>}
                    onPress={() => setInputAmount(true)}
                    style={{ paddingLeft: 10 }}
                    titleStyle={{ fontSize: 30 }}
                />
            </List.Section>
            <Button 
                mode="contained"
                onPress={onConfirm}
                buttonColor={Colors.PRIMARY}
                style={{ width: 120, paddingVertical: 10, marginHorizontal: 'auto', marginTop: 20 }}
            >
                {i18n.t(LocalizationKey.CONFIRM)}
            </Button>
            <Portal>
                <SelectWalletType
                    visible={selectWalletType}
                    setVisible={setSelectWalletType}
                    setWalletType={setType}
                />
                <InputAmount
                    visible={inputAmount}
                    setVisible={setInputAmount}
                    amount={balance}
                    setAmount={setBalance}
                />
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginHorizontal: 20,
        marginTop: 50
    },
    type: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
})