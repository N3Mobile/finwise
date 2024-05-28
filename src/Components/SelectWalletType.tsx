import React, { Dispatch, FC, SetStateAction } from "react";
import { ModalLayout } from "./ModalLayout";
import { Appbar, List } from "react-native-paper";
import { LocalizationKey, i18n } from "@/Localization";
import { ScrollView } from "react-native";
import { ALL_WALLET_TYPES } from "@/Config/wallet";
import { useWalletIcon } from "@/Hooks/icon";

interface Props {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    setWalletType: Dispatch<SetStateAction<string>>
}

export const SelectWalletType: FC<Props> = ({ visible, setVisible, setWalletType }) => {

    function onSelect(type: string) {
        setWalletType(type);
        setVisible(false);
    }

    return (
        <ModalLayout modalVisible={visible} setModalVisible={setVisible}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => setVisible(false)} />
                <Appbar.Content title={i18n.t(LocalizationKey.SELECT_WALLET_TYPE)}/>
            </Appbar.Header>
            <ScrollView>
                <List.Section>
                    {
                        ALL_WALLET_TYPES.map(type => {
                            const [name, icon, color] = useWalletIcon(type);
                            return (
                                <List.Item
                                    key={type}
                                    title={name}
                                    left={(props) => <List.Icon {...props} icon={icon} color={color} />}
                                    onPress={() => onSelect(type)}
                                />
                            )
                        })
                    }
                </List.Section>
            </ScrollView>
        </ModalLayout>
    )
}