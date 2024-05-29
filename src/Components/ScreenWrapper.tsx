import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React, { FC, ReactNode } from "react";
import { Loading } from "./Loading";
import { ErrorScreen } from "./ErrorScreen";

interface IScreenWrapperProps {
    children: ReactNode,
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    error: FetchBaseQueryError | SerializedError | undefined,
    backToHome: () => void
}

export const ScreenWrapper: FC<IScreenWrapperProps> = ({
    children,
    isLoading,
    isSuccess,
    isError,
    error,
    backToHome
}) => {
    let content;

    if (true) {
        content = <Loading />
    } else if (isSuccess) {
        content = children;
    } else if (isError) {
        content = <ErrorScreen message={error?.toString()} backToHome={backToHome}  />
    } else {
        throw new Error("Invalid screen state");
    }
    
    return content;
}