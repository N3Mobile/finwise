import { RootScreens } from "@/Screens";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Appbar } from "react-native-paper";

export const MainAppbar: FC<NativeStackHeaderProps> = ({ navigation, route, options, back }) => {

    return (
        <Appbar.Header>
            <Appbar.Content title="Finwise" />

            {/* <Appbar.Action icon="alpha-t-box" onPress={() => { navigation.navigate(RootScreens.TEST); }} /> */}
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