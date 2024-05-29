import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React, { FC, ReactNode, useState } from "react";
import { Loading } from "./Loading";
import { View } from "react-native";
import { Error } from "./Error";
import { Portal } from "react-native-paper";

interface IScreenWrapperProps {
    children: ReactNode,
    isLoading: boolean,
    isError: boolean,
    error: FetchBaseQueryError | SerializedError | undefined,
    backToHome: () => void
}

export const ScreenWrapper: FC<IScreenWrapperProps> = ({
    children,
    isLoading,
    isError,
    error,
    backToHome
}) => {
    const [errorVisible, setErrorVisible] = useState(isError);

    return (
        <View>
            {children}
            <Portal>
                <Loading 
                    visible={isLoading} 
                    setVisible={() => {}} // be patient, don't go back
                />
                <Error 
                    visible={errorVisible} 
                    setVisible={setErrorVisible}
                    message={error ? error.toString() : "No error messages"} 
                    backToHome={backToHome} 
                />
            </Portal>
        </View>
    );
}