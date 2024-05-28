import { InputAmount } from "@/Components/InputAmount";
import { SelectCategory } from "@/Components/SelectCategory";
import { SelectWallet } from "@/Components/SelectWallet";
import { SelectWalletType } from "@/Components/SelectWalletType";
import { Category } from "@/Config/category";
import { WalletType } from "@/Config/wallet";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Portal, Text } from "react-native-paper";

export const TestContainer = () => {
    const [walletId, setWalletId] = useState(0);
    const [category, setCategory] = useState(Category.ALL);
    const [walletType, setWalletType] = useState(WalletType.CASH);
    const [amount, setAmount] = useState('0');

    const [walletVisible, setWalletVisible] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [walletTypeVisible, setWalletTypeVisible] = useState(false);
    const [amountVisible, setAmountVisible] = useState(false);

    return (
        <View>
            <Text>Hello</Text>
            <Text>Wallet: {walletId}</Text>
            <Text>Category: {category}</Text>
            <Text>Wallet Type: {walletType}</Text>
            <Text>Amount: {parseFloat(amount.replace(/[^0-9.]/g, '')).toLocaleString('en')}</Text>

            <Button mode="contained" onPress={() => setWalletVisible(true)}>Select Wallet Here</Button>
            <Button mode="contained" onPress={() => setCategoryVisible(true)}>Select Category Here</Button>
            <Button mode="contained" onPress={() => setWalletTypeVisible(true)}>Select Wallet Type Here</Button>
            <Button mode="contained" onPress={() => setAmountVisible(true)}>Input Amount Here</Button>

            <Portal>
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
                <InputAmount 
                    visible={amountVisible}
                    setVisible={setAmountVisible}
                    amount={amount}
                    setAmount={setAmount}
                />
            </Portal>
        </View>
    )
}