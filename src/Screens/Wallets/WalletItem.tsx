import { LocalizationKey, i18n } from "@/Localization";
import { Wallet } from "@/Services/wallets";
import { Colors, Icons } from "@/Theme";
import { useNavigation } from "@react-navigation/native";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, IconButton, Menu, Text } from "react-native-paper";
import { RootScreens } from "..";
import { StackNavigation } from "@/Navigation";
import { useWalletIcon } from "@/Hooks/icon";

interface Props {
    wallet: Wallet,
    setDeleteId: Dispatch<SetStateAction<string>>,
    setDeteteVisible: Dispatch<SetStateAction<boolean>>
}

export const WalletItem: FC<Props> = ({ wallet, setDeleteId, setDeteteVisible }) => {

    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation<StackNavigation>();

    const [name, icon, color] = useWalletIcon(wallet.type);

    function onTransferMoney() {
        navigation.navigate(RootScreens.TRANSFER_MONEY, { wallet_id: wallet.id });
        setMenuVisible(false);
    }

    function onEdit() {
        navigation.navigate(RootScreens.EDIT_WALLET, { wallet_id: wallet.id });
        setMenuVisible(false);
    }

    function onDelete() {
        setDeleteId(wallet.id);
        setDeteteVisible(true);
        setMenuVisible(false);
    }
    
    return (
        <TouchableOpacity style={styles.container} onPress={onEdit}>
            <View style={styles.icon}>
                <Icon source={icon} size={40} color={color} />
            </View>

            <View style={styles.content}>
                <Text style={styles.name}>{wallet.name}</Text>
                <Text style={styles.amount}>{wallet.amount.toLocaleString('en')}</Text>
            </View>

            <Menu
                style={styles.menu}
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                    <IconButton 
                        icon="dots-vertical"
                        onPress={() => setMenuVisible(true)}
                    />
                }
                anchorPosition="bottom"
            >   
                <Menu.Item onPress={onTransferMoney} title={i18n.t(LocalizationKey.TRANSFER_MONEY)} />
                <Menu.Item onPress={onEdit} title={i18n.t(LocalizationKey.EDIT)} />
                <Menu.Item onPress={onDelete} title={i18n.t(LocalizationKey.DELETE)} />
            </Menu>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#',
        paddingLeft: 20,
        paddingRight: 5,
        paddingVertical: 15,
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