import { InputAmount } from "@/Components/InputAmount";
import { SelectWalletType } from "@/Components/SelectWalletType";
import { WalletType } from "@/Config/wallet";
import { http } from "@/Hooks/api";
import { useWalletIcon } from "@/Hooks/icon";
import { LocalizationKey, i18n } from "@/Localization";
import { StackNavigation } from "@/Navigation";
import { Colors } from "@/Theme";
import { useNavigation } from "@react-navigation/native";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Icon, List, Portal, Text, TextInput } from "react-native-paper";

interface Props {
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<any>>
}

export const AddWallet: FC<Props> = ({ setLoading, setError }) => {

    const navigation = useNavigation<StackNavigation>();
    const [name, setName] = useState('');
    const [type, setType] = useState(WalletType.CASH);
    const [balance, setBalance] = useState('0');
    const [selectWalletType, setSelectWalletType] = useState(false);
    const [inputAmount, setInputAmount] = useState(false);

    const [walname, walicon, walcolor] = useWalletIcon(type);

    function onSave() {
        const amount = parseFloat(balance.replace(/[^0-9.]/g, ''));

        setLoading(true);
        http.post('wallets', {}, {
            user_ID: "66237fef97705968270a6dab",
            name: name,
            type: type,
            amount: amount
        })
            .then(data => {
                console.log("fulfilled", data);
                setLoading(false);
                navigation.goBack();
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