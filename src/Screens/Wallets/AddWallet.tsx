import { useWalletIcon } from "@/Hooks/icon";
import { LocalizationKey, i18n } from "@/Localization";
import { Colors } from "@/Theme";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { Button, HelperText, Icon, List, Text, TextInput } from "react-native-paper";

interface Props {
    setAddVisible: Dispatch<SetStateAction<boolean>>
}

export const AddWallet: FC<Props> = ({ setAddVisible }) => {

    const [name, setName] = useState('');
    const [type, setType] = useState('cash');
    const [balance, setBalance] = useState('0');

    const [icon, color] = useWalletIcon(type);

    function onConfirm() {
        setAddVisible(false);
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>{i18n.t(LocalizationKey.ADD_NEW_WALLET)}</Text>
            </View>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.NAME)}</List.Subheader>
                <TextInput 
                    label={i18n.t(LocalizationKey.NAME)}
                    value={name}
                    error={!name}
                    onChangeText={(text) => setName(text)}
                    outlineColor={Colors.PRIMARY}
                    underlineColor={Colors.PRIMARY}
                    activeOutlineColor={Colors.PRIMARY}
                    activeUnderlineColor={Colors.PRIMARY}
                />
                <HelperText type="error" visible={!name}>
                    {i18n.t(LocalizationKey.ERROR_EMPTY)}
                </HelperText>
            </List.Section>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.TYPE)}</List.Subheader>
                <TouchableOpacity 
                    style={styles.type} 
                    onPress={() => type === 'cash' ? setType('card') : setType('cash')}
                >
                    <Icon source={icon} color={color} size={70} />
                    <Text style={{ fontSize: 20 }}>
                        {type === 'cash' 
                            ? i18n.t(LocalizationKey.CASH) 
                            : i18n.t(LocalizationKey.CARD)
                        }
                    </Text>
                </TouchableOpacity>
            </List.Section>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.BALANCE)}</List.Subheader>
                <TextInput 
                    maxLength={15}
                    keyboardType="numeric"
                    label={i18n.t(LocalizationKey.AMOUNT)}
                    value={balance ? parseFloat(balance.replace(/[^0-9.]/g, '')).toLocaleString('en') : ''}
                    error={!balance}
                    onChangeText={(text) => setBalance(text)}
                    outlineColor={Colors.PRIMARY}
                    underlineColor={Colors.PRIMARY}
                    activeOutlineColor={Colors.PRIMARY}
                    activeUnderlineColor={Colors.PRIMARY}
                    style={{ fontSize: 30, color: Colors.PRIMARY }}
                />
                <HelperText type="error" visible={!balance}>
                    Please enter a number!
                </HelperText>
            </List.Section>

            <View style={styles.actions}>
                <Button 
                    mode="contained"
                    onPress={onConfirm}
                    buttonColor={Colors.PRIMARY}
                    style={{ width: 120, paddingVertical: 10 }}
                >
                    {i18n.t(LocalizationKey.CONFIRM)}
                </Button>
                <Button
                    mode="contained"
                    onPress={() => setAddVisible(false)}
                    buttonColor={Colors.ERROR60}
                    style={{ width: 120, paddingVertical: 10 }}
                >
                    {i18n.t(LocalizationKey.CANCEL)}
                </Button>
            </View>  
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginVertical: 20,
        paddingHorizontal: 20
    },
    type: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20
    }
})