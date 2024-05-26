import React from "react";
import { Wallets } from "./Wallets";
import { Wallet, useGetAllWalletsQuery } from "@/Services/wallets";

export const WalletsContainer = () => {
    
    const {
        data: wallets,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllWalletsQuery();

    let content;

    if (isLoading) {
        content = <></>;
    } else if (isSuccess) {
        content = <Wallets  initialWallets={wallets}/>;
    } else if (isError) {
        content = <></>;
    }

    const testWallets: Wallet[] = [];

    return  <Wallets initialWallets={testWallets} />;
}