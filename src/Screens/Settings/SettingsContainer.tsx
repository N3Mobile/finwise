import { Language, LocalizationKey, i18n } from "@/Localization";
import { RootStackParamList } from "@/Navigation";
import { MyTheme } from "@/Theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { View } from "react-native";
import { Button, Dialog, List, Portal, Switch, Text } from "react-native-paper";
import { RootScreens, TabScreens } from "..";
import { http } from "@/Hooks/api";
import { useUser } from "@/Components/UserContext";
import { err } from "react-native-svg";
import { ScreenWrapper } from "@/Components";

type Props = NativeStackScreenProps<RootStackParamList, RootScreens.SETTINGS>;
export const SettingsContainer: FC<Props> = ({ navigation }) => {
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { userId } = useUser();
    const [language, setLanguage] = useState(i18n.locale);
    const [confirmDelete, setConfirmDelete] = useState(false);

    function onChangePassword() {
        navigation.navigate(RootScreens.PASSWORDCHANGE);
    }

    function onDeleteAccount() {
        http.delete('Users', { user_ID: userId }, {})
            .then(data => {
                console.log("Account deleted successfully");
                navigation.reset({
                    index: 0,
                    routes: [{ name: RootScreens.LOGIN }]                    
                });
            })
            .catch(error => setError(error.toString()));
    }

    function onChangeLanguage() {
        const lang = language === Language.ENGLISH ? Language.VIETNAMESE : Language.ENGLISH;
        i18n.locale = lang;
        setLanguage(lang);
    }

    return (
        <ScreenWrapper 
            loading={loading} 
            error={error} 
            backToHome={() => { navigation.navigate(RootScreens.MAIN, { screen: TabScreens.HOME }); }}>
            <List.Section>
                <List.Subheader>{i18n.t(LocalizationKey.ACCOUNT)}</List.Subheader>
                <List.Item 
                    title={i18n.t(LocalizationKey.CHANGE_PASSWORD)} 
                    left={(props) => <List.Icon {...props} icon="account-convert" />}
                    onPress={onChangePassword}
                />
                <List.Item
                    title={i18n.t(LocalizationKey.DELETE_ACCOUNT)}
                    left={(props) => <List.Icon {...props} icon="account-remove" />}
                    onPress={onDeleteAccount}
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
        </ScreenWrapper>
    )
}