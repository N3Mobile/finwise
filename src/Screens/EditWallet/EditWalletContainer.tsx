import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { RootScreens } from "..";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, HelperText, Icon, List, Text, TextInput } from "react-native-paper";
import { LocalizationKey, i18n } from "@/Localization";
import { Colors } from "@/Theme";
import { useWalletIcon } from "@/Hooks/icon";

type Props = NativeStackScreenProps<RootStackParamList, RootScreens.EDIT_WALLET>;

export const EditWalletContainer: FC<Props> = ({ route }) => {

    const [name, setName] = useState('');
    const [type, setType] = useState('cash');
    const [balance, setBalance] = useState('0');

    const [icon, color] = useWalletIcon(type);

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
                />
                <HelperText type="error" visible={!name}>
                    {i18n.t(LocalizationKey.ERROR_EMPTY)}
                </HelperText>
            </View>
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
                <View>
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
                </View>
            </List.Section>
            <Button 
                mode="contained"
                onPress={onConfirm}
                buttonColor={Colors.PRIMARY}
                style={{ width: 120, paddingVertical: 10, marginHorizontal: 'auto' }}
            >
                {i18n.t(LocalizationKey.CONFIRM)}
            </Button>
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