import React, { Dispatch, FC, SetStateAction } from "react";
import { ModalLayout } from "./ModalLayout";
import { Appbar, List } from "react-native-paper";
import { LocalizationKey, i18n } from "@/Localization";
import { ScrollView } from "react-native";
import { ALL_PERIOD_TYPES } from "@/Config/period";
import { useFormattedDate, usePeriod } from "@/Hooks/date";

interface Props {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    period: string,
    setPeriod: Dispatch<SetStateAction<string>>
}

export const SelectPeriod: FC<Props> = ({ visible, setVisible, period, setPeriod }) => {
    function onSelect(type: string) {
        setPeriod(type);
        setVisible(false);
    }

    return (
        <ModalLayout modalVisible={visible} setModalVisible={setVisible}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => setVisible(false)} />
                <Appbar.Content title={i18n.t(LocalizationKey.SELECT_PERIOD)} />
            </Appbar.Header>
            <ScrollView>
                <List.Section>
                    {
                        ALL_PERIOD_TYPES.map(type => {
                            const [title, start, end, left] = usePeriod(type);

                            return (
                                <List.Item
                                    key={type}
                                    title={title + ` (${useFormattedDate(start)} - ${useFormattedDate(end)})`}
                                    left={(props) => <List.Icon {...props} icon="calendar" />}
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