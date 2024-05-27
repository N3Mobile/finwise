import { SelectCategory } from "@/Components/SelectCategory";
import { SelectWallet } from "@/Components/SelectWallet";
import { SelectWalletType } from "@/Components/SelectWalletType";
import { Category } from "@/Config/category";
import { WalletType } from "@/Config/wallet";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

export const TestContainer = () => {
    const [walletId, setWalletId] = useState(0);
    const [category, setCategory] = useState(Category.ALL);
    const [walletType, setWalletType] = useState(WalletType.CASH);
    const [walletVisible, setWalletVisible] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [walletTypeVisible, setWalletTypeVisible] = useState(false);

    return (
        <View>
            <Text>Hello</Text>
            <Text>Wallet: {walletId}</Text>
            <Text>Category: {category}</Text>
            <Text>Wallet Type: {walletType}</Text>
            <Button mode="contained" onPress={() => setWalletVisible(true)}>Select Wallet Here</Button>
            <Button mode="contained" onPress={() => setCategoryVisible(true)}>Select Category Here</Button>
            <Button mode="contained" onPress={() => setWalletTypeVisible(true)}>Select Wallet Type Here</Button>
            <SelectWallet 
                visible={walletVisible} 
                setVisible={setWalletVisible} 
                walletId={walletId}
                setWalletId={setWalletId} 
            />
            <SelectCategory
                visible={categoryVisible}
                setVisible={setCategoryVisible}
                all
                income
                expense
                setCategory={setCategory}
            />
            <SelectWalletType
                visible={walletTypeVisible}
                setVisible={setWalletTypeVisible}
                setWalletType={setWalletType}
            />
        </View>
    )
}