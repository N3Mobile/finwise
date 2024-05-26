import React, { FC, useCallback, useState } from "react";
import { Button, Divider, HelperText, List, Modal, Portal, Text, TextInput } from "react-native-paper";
import { LocalizationKey, i18n } from "@/Localization";
import { useWalletIcon } from "@/Hooks/icon";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SelectWallet } from "./SelectWallet";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from "@/Theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type Props = NativeStackScreenProps<RootStackParamList, RootScreens.TRANSFER_MONEY>;

export const TransferMoneyContainer: FC<Props> = ({ route }) => {

    const [walletIcon, walletColor] = useWalletIcon('cash');

    const [amount, setAmount] = useState('0');
    const [pendingAmount, setPendingAmount] = useState(amount);
    const [fromWalletId, setFromWalletId] = useState<number | null>(route.params.wallet_id);
    const [toWalletId, setToWalletId] = useState<number | null>(null);
    const [date, setDate] = useState(new Date());

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
        setSelectToVisible(true);
    }

    function changeDate() {
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
                    <Text style={{ fontSize: 30 }}>
                        {amount ? parseFloat(amount).toLocaleString() : '...'}
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
                    title={i18n.t(LocalizationKey.TODAY)}
                    onPress={changeDate}
                />
            </List.Section>
            <Button 
                mode="contained" 
                buttonColor={Colors.PRIMARY}
                onPress={onConfirm}
                style={{ width: 120, paddingVertical: 10, marginHorizontal: 'auto' }}
            >
                {i18n.t(LocalizationKey.CONFIRM)}
            </Button>
            
            <Portal>
                <Modal
                    visible={inputAmountVisible}
                    dismissable={false}
                    style={{
                        backgroundColor: 'white'
                    }}
                >
                    <TextInput 
                        maxLength={15}
                        keyboardType="numeric"
                        label={i18n.t(LocalizationKey.AMOUNT)}
                        // placeholder="Numbers only"
                        value={pendingAmount ? parseFloat(pendingAmount.replace(/[^0-9.]/g, '')).toLocaleString('en-gb') : ''}
                        error={!pendingAmount}
                        onChangeText={(text) => {
                            setPendingAmount(text);
                        }}
                        left={<TextInput.Affix text="VND  " />}
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
                        <Button
                            mode="contained"
                            buttonColor={Colors.TERTIARY}
                            disabled={!pendingAmount}
                            onPress={() => {
                                setPendingAmount(pendingAmount + "000");
                            }}
                            style={{ width: '40%' }}
                        >
                            000
                        </Button>
                        <Button 
                            mode="contained"
                            buttonColor={Colors.PRIMARY}
                            disabled={!pendingAmount}
                            onPress={() => {
                                setAmount(pendingAmount);
                                setInputAmountVisible(false);
                            }}
                            style={{ width: '40%' }}
                        >
                            {i18n.t(LocalizationKey.CONFIRM)}
                        </Button>
                    </View>
                    
                </Modal>
            </Portal>
            <Portal>
                <Modal 
                    visible={selectFromVisible}
                    onDismiss={() => setSelectFromVisible(false)}
                    contentContainerStyle={{
                        backgroundColor: "white",
                        padding: 20
                    }}
                >
                    <SelectWallet walletId={fromWalletId} setWalletId={setFromWalletId}/>
                    <ScrollView style={styles.action}>
                        <Button 
                            mode="contained" 
                            buttonColor={Colors.PRIMARY}
                            onPress={() => setSelectFromVisible(false)}>
                            OK
                        </Button>
                    </ScrollView> 
                </Modal>
            </Portal>
            <Portal>
                <Modal
                    visible={selectToVisible}
                    onDismiss={() => setSelectToVisible(false)}
                    contentContainerStyle={{
                        backgroundColor: "white",
                        padding: 20
                    }}
                >
                    <SelectWallet walletId={toWalletId} setWalletId={setToWalletId} />
                    <ScrollView style={styles.action}>
                        <Button 
                            mode="contained"
                            buttonColor={Colors.PRIMARY}
                            onPress={() => setSelectToVisible(false)}
                        >
                            OK
                        </Button>
                    </ScrollView> 
                </Modal>
            </Portal>
            <Portal>
                {
                    selectDateVisible &&
                    <DateTimePicker 
                        value={date}
                        mode="date"
                        onChange={(event, date) => {
                            if (event.type === 'dismissed') {
                                setSelectDateVisible(false);
                            } else if (event.type === 'set' && date) {
                                setDate(date);
                            }
                        }}
                    />
                }
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