import React, { FC, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { WalletItem } from "./WalletItem";
import { Wallet } from "@/Services/wallets";
import { Button, Dialog, Divider, IconButton, List, Modal, Portal, Text } from "react-native-paper";
import { LocalizationKey, i18n } from "@/Localization";
import { Colors } from "@/Theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/Navigation";
import { RootScreens } from "..";

interface Props {
    initialWallets: Wallet[]
}

export const Wallets: FC<Props> = ({ initialWallets }) => {

    const navigation = useNavigation<StackNavigation>();
    const init: Array<Wallet> = [
        {
            id: 1,
            user_id: 1,
            type: "cash",
            name: "Cash 1",
            amount: 1000
        },
        {
            id: 2,
            user_id: 1,
            type: "cash",
            name: "Cash 2",
            amount: 2000
        },
        {
            id: 3,
            user_id: 1,
            type: "card",
            name: "A card",
            amount: 3000
        },
        {
            id: 4,
            user_id: 1,
            type: "card",
            name: "A card",
            amount: 3000
        },
        {
            id: 5,
            user_id: 1,
            type: "card",
            name: "A card",
            amount: 3000
        },
        {
            id: 6,
            user_id: 1,
            type: "card",
            name: "A card",
            amount: 3000
        },
        {
            id: 7,
            user_id: 1,
            type: "card",
            name: "A card",
            amount: 3000
        },
        {
            id: 8,
            user_id: 1,
            type: "card",
            name: "A card",
            amount: 3000
        }
    ]

    const [wallets, setWallets] = useState(init);
    const [pendingId, setPendingId] = useState<number | null>(null)
    const [deleteVisible, setDeleteVisible] = useState(false);

    function addWallet() {
        navigation.navigate(RootScreens.ADD_WALLET);
    }

    function deleteWallet(id: number) {
        setDeleteVisible(false);
        setPendingId(null);
        setWallets(wallets.filter(wallet => wallet.id !== id));
        // ...
    }

    return (
        <View style={{ height: '100%' }}>
            <FlatList 
                data={wallets}
                renderItem={({ item }) => 
                    <WalletItem 
                        wallet={item} 
                        setDeleteId={setPendingId} 
                        setDeteteVisible={setDeleteVisible}
                    />
                }
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={Divider}
            />
            <Divider />
            <IconButton 
                mode="contained" 
                icon="plus" 
                iconColor={Colors.WHITE}
                containerColor={Colors.SUFACE_TINT_COLOR}
                size={50}
                style={{ alignSelf: 'flex-end', margin: 15 }}
                onPress={addWallet}
            />

            <Portal>
                <Dialog visible={deleteVisible} onDismiss={() => setDeleteVisible(false)}>
                    <Dialog.Title>Delete!</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Are u sure?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDeleteVisible(false)}>
                            {i18n.t(LocalizationKey.CANCEL)}
                        </Button>
                        <Button onPress={() => pendingId ? deleteWallet(pendingId): setDeleteVisible(false)}>
                            {i18n.t(LocalizationKey.CONFIRM)}
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}