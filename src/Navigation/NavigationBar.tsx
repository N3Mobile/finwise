// import { Route } from "@react-navigation/native";
// import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";

interface INavigationBarProps {
    navigation: any,
    route: any,
    options: any,
    back?: boolean
}

export const NavigationBar: FC<INavigationBarProps> = ({ navigation, route, options, back }) => {
    // const title = getHeaderTitle(options, route.name);

    return (
        <Appbar.Header>
            {back 
                ? <Appbar.BackAction onPress={navigation.goBack} />
                : null
            }
            <Appbar.Content title="Finwise" />
        </Appbar.Header>
    )
}