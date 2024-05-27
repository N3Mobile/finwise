import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { getHeaderTitle } from "@react-navigation/elements";
import React, { FC, ReactNode } from "react";
import { Appbar } from "react-native-paper";

type Props = NativeStackHeaderProps & {
    children: ReactNode
}

export const CustomAppbar: FC<Props> = ({ navigation, route, options, back, children }) => {
    const title = getHeaderTitle(options, route.name);

    return (
        <Appbar.Header>
            {back
                ? <Appbar.BackAction onPress={navigation.goBack} />
                : null
            }
            <Appbar.Content title={title} />
            {children}
        </Appbar.Header>
    )
}