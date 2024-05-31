import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { ModalLayout } from "./ModalLayout";
import { HelperText, IconButton, TextInput, Tooltip } from "react-native-paper";
import { LocalizationKey, i18n } from "@/Localization";
import { Colors, MyTheme } from "@/Theme";
import { View } from "react-native";

interface Props {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    amount: string,
    setAmount: Dispatch<SetStateAction<string>>
}

export const InputAmount: FC<Props> = ({ visible, setVisible, amount, setAmount }) => {

    const [pendingAmount, setPendingAmount] = useState(amount);

    return (
        <ModalLayout modalVisible={visible} setModalVisible={setVisible}>
            <TextInput 
                maxLength={15}
                keyboardType="numeric"
                label={i18n.t(LocalizationKey.AMOUNT)}
                value={pendingAmount ? parseFloat(pendingAmount.replace(/[^0-9.]/g, '')).toLocaleString('en') : ''}
                error={!pendingAmount}
                onChangeText={(text) => {
                    if (isNaN(parseFloat(pendingAmount.replace(/[^0-9.]/g, '')))) {
                        setPendingAmount('0');
                    } else {
                        setPendingAmount(text);
                    }
                }}
                left={<TextInput.Affix text="VND  "/>}
                outlineColor={Colors.PRIMARY}
                underlineColor={Colors.PRIMARY}
                activeOutlineColor={Colors.PRIMARY}
                activeUnderlineColor={Colors.PRIMARY}
                style={{ fontSize: 30, color: Colors.PRIMARY }}
            />
            <HelperText type="error" visible={!pendingAmount}>
                Please enter a number!
            </HelperText>
            <View style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 10
            }}>
                <Tooltip title={i18n.t(LocalizationKey.ADD) + " 000"}>
                    <IconButton
                        icon="numeric-0"
                        iconColor={MyTheme.WHITE}
                        onPress={() => {
                            setPendingAmount(pendingAmount + "000");
                        }}
                        containerColor={MyTheme.ORANGE}
                        size={50}
                    />
                </Tooltip>
                <Tooltip title={i18n.t(LocalizationKey.CLEAR)}>
                    <IconButton
                        icon="trash-can-outline"
                        iconColor={MyTheme.WHITE}
                        onPress={() => setPendingAmount("")}
                        containerColor={MyTheme.PINK}
                        size={50}
                    />
                </Tooltip>
                <Tooltip title={i18n.t(LocalizationKey.CONFIRM)}>
                    <IconButton
                        icon="check"
                        iconColor={MyTheme.WHITE}
                        disabled={pendingAmount === ""}
                        onPress={() => {
                            setAmount(pendingAmount);
                            setVisible(false);
                        }}
                        containerColor={MyTheme.GREEN}
                        size={50}
                    />
                </Tooltip>  
                <Tooltip title={i18n.t(LocalizationKey.CANCEL)}>
                    <IconButton
                        icon="close"
                        iconColor={MyTheme.WHITE}
                        onPress={() => {
                            setVisible(false);
                        }}
                        containerColor={MyTheme.RED}
                        size={50}
                    />
                </Tooltip>
            </View>
        </ModalLayout>
    )
}