import { InputAmount } from "@/Components/InputAmount";
import { SelectWalletType } from "@/Components/SelectWalletType";
import { Category } from "@/Config/category";
import { http } from "@/Hooks/api";
import { useWalletIcon } from "@/Hooks/icon";
import { LocalizationKey, i18n } from "@/Localization";
import { StackNavigation } from "@/Navigation";
import { Colors } from "@/Theme";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Icon, List, Portal, TextInput } from "react-native-paper";

interface Props {
    walletId: string,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string>>
}

export const EditWallet: FC<Props> = ({ walletId, setLoading, setError }) => {

    const navigation = useNavigation<StackNavigation>();
    
    const [previousAmount, setPreviousAmount] = useState(0);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [balance, setBalance] = useState("0");
    const [selectWalletType, setSelectWalletType] = useState(false);
    const [inputAmount, setInputAmount] = useState(false);
    const [walname, walicon, walcolor] = useWalletIcon(type);

    const invalidAmount = parseFloat(balance.replace(/[^0-9.]/g, '')) === 0;

    useFocusEffect(
        useCallback(() => {
            http.get('wallets/byWalletsId', { _id: walletId })
                .then(data => {
                    setPreviousAmount(data.amount);
                    setName(data.name);
                    setType(data.type);
                    setBalance(data.amount.toString());
                    setLoading(false);
                })
                .catch(error => setError(error.toString()));
        }, [])
    );

    function onSave() {
        setLoading(true);
        http.patch("wallets", {
            _id: walletId,
            name: name,
            type: type
        }, null)
            .then(data => {
                console.log("fulfilled", data);
                const amount = parseFloat(balance.replace(/[^0-9.]/g, ''));

                if (amount !== previousAmount) {
                    http.post("transaction", {}, {
                        wallet_id: walletId,
                        category: amount < previousAmount ? Category.OUTGOING_TRANSFER : Category.INCOMING_TRANSFER,
                        amount: Math.abs(previousAmount - amount),
                        is_pay: amount < previousAmount,
                        note_info: "Adjust wallet amount"
                    })
                        .then(data => {
                            console.log("fulfilled", data);
                            setLoading(false);
                            navigation.goBack();
                        })
                        .catch(error => setError(error.toString()));
                } else {
                    setLoading(false);
                    navigation.goBack();
                }
            })
            .catch(error => setError(error.toString()));
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
                <HelperText type="error" visible style={{ display: invalidAmount ? 'flex' : 'none' }}>
                    {i18n.t(LocalizationKey.ZERO_AMOUNT)}
                </HelperText>
            </List.Section>
            <Button 
                mode="contained"
                onPress={onSave}
                buttonColor={Colors.PRIMARY}
                style={{ width: 120, paddingVertical: 10, marginHorizontal: 'auto', marginTop: 20 }}
            >
                {i18n.t(LocalizationKey.SAVE)}
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