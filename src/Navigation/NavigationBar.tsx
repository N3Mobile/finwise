import React, { FC } from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { RootScreens } from "@/Screens";
import { Language, i18n } from "@/Localization";

export const NavigationBar: FC<NativeStackHeaderProps> = ({ navigation, route, options, back }) => {
    const title = getHeaderTitle(options, route.name);

    if (title === RootScreens.WELCOME) {
        return (<></>)
    }

    const isMain = title === RootScreens.MAIN;
    const hasBack = back && !isMain;

    if (!isMain) {
        return (
            <Appbar.Header>
                {hasBack
                    ? <Appbar.BackAction onPress={navigation.goBack} />
                    : null
                }
                <Appbar.Content title={title == RootScreens.MAIN ? "Finwise" : title} />
            </Appbar.Header>
        )
    }

    return (
        <Appbar.Header>
            {hasBack
                ? <Appbar.BackAction onPress={navigation.goBack} />
                : null
            }
            <Appbar.Content title={title == RootScreens.MAIN ? "Finwise" : title} />

            <Appbar.Action icon={ i18n.locale == Language.ENGLISH ? "alpha-e-box" : "alpha-v-box" } />
            <Appbar.Action icon="logout" onPress={() => {
                // TODO: logout (clear user info and disable back action)
                navigation.navigate(RootScreens.LOGIN);
            }} />
            <Appbar.Action icon="cog" onPress={() => {
                navigation.navigate(RootScreens.SETTINGS);
            }} />
        </Appbar.Header>
    )
}