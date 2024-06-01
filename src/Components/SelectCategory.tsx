import React, { Dispatch, FC, SetStateAction } from "react";
import { ModalLayout } from "./ModalLayout";
import { ScrollView } from "react-native";
import { Appbar, List } from "react-native-paper";
import { LocalizationKey, i18n } from "@/Localization";
import { useCategoryIcon } from "@/Hooks/icon";
import { ALL_EXPENSE_CATEGORIES, ALL_INCOME_CATEGORIES } from "@/Config/category";

interface Props {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    all: boolean,
    income: boolean,
    expense: boolean,
    setCategory: Dispatch<SetStateAction<string>>
}

export const SelectCategory: FC<Props> = ({ visible, setVisible, all, income, expense, setCategory }) => {

    function onSelect(categoryKey: string) {
        const category = i18n.t(LocalizationKey[categoryKey.replace(/-/g, '_').toUpperCase() as keyof typeof LocalizationKey]);
        setCategory(category);
        setVisible(false);
    }

    return (
        <ModalLayout modalVisible={visible} setModalVisible={setVisible}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => setVisible(false)} />
                <Appbar.Content title={i18n.t(LocalizationKey.SELECT_CATEGORY)} />
            </Appbar.Header>
            <ScrollView>
                { all ?
                <List.Section>
                    <List.Subheader>{i18n.t(LocalizationKey.ALL)}</List.Subheader>
                    <List.Item 
                        title={i18n.t(LocalizationKey.ALL)}
                        left={(props) => { 
                            const [name, icon, color] = useCategoryIcon("all");
                            return <List.Icon {...props} icon={icon} color={color} />
                        }}
                        onPress={() => onSelect("all")}
                    />
                </List.Section>
                : <></>
                }
                { income ?
                <List.Section>
                    <List.Subheader>{i18n.t(LocalizationKey.INCOME)}</List.Subheader>
                    {
                        ALL_INCOME_CATEGORIES.map(type => {

                            const [name, icon, color] = useCategoryIcon(type);
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
                : <></>
                }
                { expense ?
                <List.Section>
                    <List.Subheader>{i18n.t(LocalizationKey.EXPENSE)}</List.Subheader>
                    {
                        ALL_EXPENSE_CATEGORIES.map(type => {

                            const [name, icon, color] = useCategoryIcon(type);
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
                : <></>
                }
            </ScrollView>
        </ModalLayout>
    )
}