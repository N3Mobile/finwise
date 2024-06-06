import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { WalletItem } from "./WalletItem";
import { Wallet } from "@/Services/wallets";
import { Button, Dialog, Divider, IconButton, List, Modal, Portal, Text } from "react-native-paper";
import { LocalizationKey, i18n } from "@/Localization";
import { Colors } from "@/Theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/Navigation";
import { RootScreens } from "..";
import { http } from "@/Hooks/api";
import { newDataComing } from "../History/newTransactComing";

interface Props {
    wallets: Wallet[],
    setWallets: Dispatch<SetStateAction<Wallet[]>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<any>>
}

export const Wallets: FC<Props> = ({ wallets, setWallets, setLoading, setError }) => {

    const navigation = useNavigation<StackNavigation>();
    const [pendingId, setPendingId] = useState<string>("");
    const [deleteVisible, setDeleteVisible] = useState(false);

    function addWallet() {
        navigation.navigate(RootScreens.ADD_WALLET);
    }

    function deleteWallet(id: string) {

        if (id === "") {
            throw new Error("Failed to delete wallet: id is not specified");
        }

        setLoading(true);
        http.delete('wallets', { _id: id }, null)
            .then(data => {
                console.log("fulfilled", data);
                setDeleteVisible(false);
                setPendingId("");
                setWallets(wallets.filter(wallet => wallet.id !== id));
                newDataComing.newWallet = true;
                setLoading(false);
            })
            .catch(error => setError(error.toString()));
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
                        <Button onPress={() => deleteWallet(pendingId)}>
                            {i18n.t(LocalizationKey.CONFIRM)}
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}