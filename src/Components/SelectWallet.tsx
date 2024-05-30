import { LocalizationKey, i18n } from "@/Localization";
import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, List } from "react-native-paper";
import { ModalLayout } from "./ModalLayout";
import { WalletType } from "@/Config/wallet";
import { useWalletIcon } from "@/Hooks/icon";
import { Wallet } from "@/Services/wallets";

interface Props {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    wallets: Wallet[],
    walletId: string,
    setWalletId: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string>>
}

export const SelectWallet: FC<Props> = ({ visible, setVisible, wallets, walletId, setWalletId, setLoading, setError }) => {

    const [selected, setSelected] = useState(walletId);

    function onSelect(id: string) {
        setSelected(id);
        setWalletId(id);
    }

    return (
        <ModalLayout modalVisible={visible} setModalVisible={setVisible}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => setVisible(false)} />
                <Appbar.Content title={i18n.t(LocalizationKey.SELECT_WALLET)} />
            </Appbar.Header>
            <ScrollView>
                <List.Section>
                    <List.Subheader>{i18n.t(LocalizationKey.CASH)}</List.Subheader>
                    {
                        wallets.filter(wallet => wallet.type === WalletType.CASH).map(wallet => {

                            const [name, icon, color] = useWalletIcon(wallet.type);
                            return (
                                <List.Item
                                    key={wallet.id}
                                    title={wallet.name}
                                    description={wallet.amount.toLocaleString('en') + " VND"}
                                    left={(props) => <List.Icon {...props} icon={icon} color={color} />}
                                    right={(props) => (selected === wallet.id) ? <List.Icon {...props} icon={"check-bold"} color="green" /> : <></>}
                                    style={selected === wallet.id ? styles.selected : styles.item}
                                    onPress={() => onSelect(wallet.id)}
                                />
                            )
                        })
                    }
                </List.Section>
                <List.Section>
                    <List.Subheader>{i18n.t(LocalizationKey.CARD)}</List.Subheader>
                    {
                        wallets.filter(wallet => wallet.type === WalletType.CARD).map(wallet => {

                            const [name, icon, color] = useWalletIcon(wallet.type);
                            return (
                                <List.Item
                                    key={wallet.id}
                                    title={wallet.name}
                                    description={wallet.amount.toLocaleString('en') + " VND"}
                                    left={(props) => <List.Icon {...props} icon={icon} color={color} />}
                                    right={(props) => (selected === wallet.id) ? <List.Icon {...props} icon={"check-bold"} color="green" /> : <></>}
                                    style={selected === wallet.id ? styles.selected : styles.item}
                                    onPress={() => onSelect(wallet.id)}
                                />
                            )
                        })
                    }
                </List.Section>
                <List.Section>
                    <List.Subheader>{i18n.t(LocalizationKey.EWALLET)}</List.Subheader>
                    {
                        wallets.filter(wallet => wallet.type === WalletType.EWALLET).map(wallet => {

                            const [name, icon, color] = useWalletIcon(wallet.type);
                            return (
                                <List.Item
                                    key={wallet.id}
                                    title={wallet.name}
                                    description={wallet.amount.toLocaleString('en') + " VND"}
                                    left={(props) => <List.Icon {...props} icon={icon} color={color} />}
                                    right={(props) => (selected === wallet.id) ? <List.Icon {...props} icon={"check-bold"} color="green" /> : <></>}
                                    style={selected === wallet.id ? styles.selected : styles.item}
                                    onPress={() => onSelect(wallet.id)}
                                />
                            )
                        })
                    }
                </List.Section>
            </ScrollView>
        </ModalLayout>
    )
}

const styles = StyleSheet.create({
    item: {
    },
    selected: {
        backgroundColor: '#D1FFBD'
    }
})