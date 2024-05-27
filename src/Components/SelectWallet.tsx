import { LocalizationKey, i18n } from "@/Localization";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, List } from "react-native-paper";
import { ModalLayout } from "./ModalLayout";
import { WalletType } from "@/Config/wallet";
import { useWalletIcon } from "@/Hooks/icon";

interface Props {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    walletId: number,
    setWalletId: Dispatch<SetStateAction<number>>
}

export const SelectWallet: FC<Props> = ({ visible, setVisible, walletId, setWalletId }) => {

    const sampleWallets = [...Array(9).keys()].map(index => 
        {
            return {
                id: index,
                user_id: 1,
                type: index < 3 ? "cash" : (
                    index > 6 ? "ewallet" : "card"
                ),
                name: "test",
                amount: 1000000
            }
        }
    );

    const [selected, setSelected] = useState(walletId);

    function onSelect(id: number) {
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
                        sampleWallets.filter(wallet => wallet.type === WalletType.CASH).map(wallet => {

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
                        sampleWallets.filter(wallet => wallet.type === WalletType.CARD).map(wallet => {

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
                        sampleWallets.filter(wallet => wallet.type === WalletType.EWALLET).map(wallet => {

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