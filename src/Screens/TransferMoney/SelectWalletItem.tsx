import { useWalletIcon } from "@/Hooks/icon";
import { Wallet } from "@/Services/wallets";
import React, { FC } from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";

interface Props {
    wallet: Wallet,
    selected: boolean,
    onPress: (event: GestureResponderEvent) => void
}

export const SelectWalletItem: FC<Props> = ({ wallet, selected, onPress }) => {

    const [icon, color] = useWalletIcon(wallet.type);

    return (
        <TouchableOpacity style={selected ? styles.containerSelected : styles.container} onPress={onPress}>
            <View style={styles.icon}>
                <Icon source={icon} size={40} color={color} />
            </View>

            <View style={styles.content}>
                <Text style={styles.name}>{wallet.name}</Text>
                <Text style={styles.amount}>{wallet.amount} ₫</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 5,
        paddingVertical: 15,
    },
    containerSelected: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 5,
        paddingVertical: 15,
        backgroundColor: 'lightblue'
    },
    icon: {
        flex: 1
    },
    content: {
        flex: 3,
        gap: 5
    },
    menu: {
        flex: 1
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18
    },
    amount: {

    }
});