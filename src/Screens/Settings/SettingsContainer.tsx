import { Language, LocalizationKey, i18n } from "@/Localization";
import { RootStackParamList } from "@/Navigation";
import { MyTheme } from "@/Theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { View } from "react-native";
import { Button, Dialog, List, Portal, Switch, Text } from "react-native-paper";
import { RootScreens } from "..";

type Props = NativeStackScreenProps<RootStackParamList, RootScreens.SETTINGS>;
export const SettingsContainer: FC<Props> = ({ navigation }) => {
    
    const [language, setLanguage] = useState(i18n.locale);
    const [confirmDelete, setConfirmDelete] = useState(false);

    function onChangePassword() {
        // TODO: navigate to change password screen
        // navigation.navigate()
    }

    function onDeleteAccount() {
        // TODO: delete account
    }

    function onChangeLanguage() {
        const lang = language === Language.ENGLISH ? Language.VIETNAMESE : Language.ENGLISH;
        i18n.locale = lang;
        setLanguage(lang);
    }

    return (
        <View>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.ACCOUNT)}</List.Subheader>
                <List.Item 
                    title={i18n.t(LocalizationKey.CHANGE_PASSWORD)} 
                    left={(props) => <List.Icon {...props} icon="account-convert" />}
                />
                <List.Item
                    title={i18n.t(LocalizationKey.DELETE_ACCOUNT)}
                    left={(props) => <List.Icon {...props} icon="account-remove" />}
                />
            </List.Section>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.LANGUAGE)}</List.Subheader>
                <List.Item
                    title={language === Language.ENGLISH ? i18n.t(LocalizationKey.ENGLISH) : i18n.t(LocalizationKey.VIETNAMESE)}
                    left={(props) => 
                        <List.Icon 
                            {...props} 
                            icon={language === Language.ENGLISH ? 'alpha-e-box' : 'alpha-v-box'} 
                            color={language === Language.ENGLISH ? MyTheme.BLUE : MyTheme.RED}
                        />
                    }
                    right={(props) =>
                        <Switch
                            {...props}
                            value={language === Language.ENGLISH}
                            onValueChange={onChangeLanguage}
                        />
                    }
                />
            </List.Section>
            <Portal>
                <Dialog visible={confirmDelete} onDismiss={() => setConfirmDelete(false)}>
                    <Dialog.Title>{i18n.t(LocalizationKey.DELETE_ACCOUNT)}</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{i18n.t(LocalizationKey.DELETE_ACCOUNT_CONFIRM)}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setConfirmDelete(false)}>{i18n.t(LocalizationKey.CANCEL)}</Button>
                        <Button onPress={onDeleteAccount}>{i18n.t(LocalizationKey.CONFIRM)}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}