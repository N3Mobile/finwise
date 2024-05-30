import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React, { FC, ReactNode } from "react";
import { Loading } from "./Loading";
import { ErrorScreen } from "./ErrorScreen";
import { View } from "react-native";

interface IScreenWrapperProps {
    children: ReactNode,
    loading: boolean,
    error: string,
    backToHome: () => void
}

export const ScreenWrapper: FC<IScreenWrapperProps> = ({
    children,
    loading,
    error,
    backToHome
}) => {
    let content;

    if (error) {
        content = (<ErrorScreen message={error} backToHome={backToHome}  />);
    } else if (loading) {
        content = (<Loading />);
    } else {
        content = children;
    }
    
    return (
        <View>
            {content}
        </View>
    );
}
