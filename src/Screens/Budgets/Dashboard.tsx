import { SelectPeriod } from "@/Components/SelectPeriod";
import { SelectWallet } from "@/Components/SelectWallet";
import { usePeriod } from "@/Hooks/date";
import { useWalletIcon } from "@/Hooks/icon";
import { LocalizationKey, i18n } from "@/Localization";
import { Wallet } from "@/Services/wallets";
import { Colors, MyTheme } from "@/Theme";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Button, IconButton, List, Portal, Text } from "react-native-paper";

interface Props {
    totalAmount: number,
    totalSpent: number,
    period: string,
    setPeriod: Dispatch<SetStateAction<string>>,
    wallet: Wallet,
    setWalletId: Dispatch<SetStateAction<number>>,
    addBudget: () => void
}

export const Dashboard: FC<Props> = ({ totalAmount, totalSpent, period, setPeriod, wallet, setWalletId, addBudget }) => {

    let formatter = Intl.NumberFormat('en', { notation: 'compact' });
    const overspent = totalSpent > totalAmount;

    const [walname, walicon, walcolor] = useWalletIcon(wallet.type);
    const [selectWallet, setSelectWallet] = useState(false);

    const [periodTitle, start, end, left] = usePeriod(period);
    const [selectPeriod, setSelectPeriod] = useState(false);

    return (
        <View style={styles.container}>
            <AnimatedCircularProgress
                size={350}
                width={20}
                fill={totalSpent / totalAmount * 100}
                rotation={270}
                lineCap='round'
                arcSweepAngle={180}
                tintColor={ overspent ? MyTheme.RED : Colors.PRIMARY70 }
                backgroundColor="lightgray"
                style={{ height: 220 }}
            >
                {
                    (fill) => 
                    <View style={{ alignItems: 'center', position: 'absolute', top: 50 }}>
                        <Button 
                            mode="contained" 
                            buttonColor={MyTheme.LAGOON}
                            onPress={() => setSelectPeriod(true)}
                        >
                            <Text style={{ color: "white" }}>{periodTitle}</Text>
                        </Button>
                        <Text style={{ fontSize: 20, color: 'gray', marginTop: 10 }}>{i18n.t(LocalizationKey.CAN_SPEND)}</Text>
                        <Text style={{ fontSize: 30 }}>{(totalAmount - totalSpent).toLocaleString('en')}</Text>
                    </View>
                }
            </AnimatedCircularProgress>
            <View style={styles.stat}>
                <View style={styles.statItem}>
                    <Text style={styles.number}>{formatter.format(totalAmount)}</Text>
                    <Text style={styles.desc}>{i18n.t(LocalizationKey.TOTAL_BUDGET)}</Text>
                </View>
                <View style={styles.statItemX}>
                    <Text style={styles.number}>{formatter.format(totalSpent)}</Text>
                    <Text style={styles.desc}>{i18n.t(LocalizationKey.TOTAL_SPENT)}</Text>
                </View>
                <View style={styles.statItemX}>
                    <Text style={styles.number}>{left.toString() + " " + i18n.t(LocalizationKey.DAYS)}</Text>
                    <Text style={styles.desc}>{i18n.t(LocalizationKey.REMAINING)}</Text>
                </View>
            </View>
            <View style={styles.action}>
                <IconButton
                    icon="notebook-outline"
                    size={50}
                    onPress={() => {}}
                    iconColor="white"
                    containerColor={MyTheme.ORANGE}
                />
                {/* <TouchableOpacity > */}
                    <List.Item
                        title={walname}
                        left={(props) => <List.Icon {...props} icon={walicon} color={walcolor} />}
                        onPress={() => setSelectWallet(true)}
                        titleStyle={{ color: "white" }}
                        style={{ backgroundColor: MyTheme.BLACK, borderRadius: 20, paddingVertical: 15 }}
                    />
                {/* </TouchableOpacity> */}
                <IconButton 
                    icon="plus"
                    size={50}
                    onPress={addBudget}
                    iconColor="white"
                    containerColor={Colors.PRIMARY70}
                />
            </View>
            <Portal>
                <SelectWallet
                    visible={selectWallet}
                    setVisible={setSelectWallet}
                    walletId={wallet.id}
                    setWalletId={setWalletId}
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

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    stat: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20
    },
    number: {
        fontSize: 20
    },
    desc: {
        fontSize: 13,
        color: 'gray',
        marginTop: 5
    },
    statItem: {
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    statItemX: {
        borderLeftWidth: 2,
        borderLeftColor: 'lightgray',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    action: {
        // display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20
    }
})