import { Loading } from "@/Components";
import { InputAmount } from "@/Components/InputAmount";
import { SelectCategory } from "@/Components/SelectCategory";
import { SelectWallet } from "@/Components/SelectWallet";
import { SelectWalletType } from "@/Components/SelectWalletType";
import { Category } from "@/Config/category";
import { WalletType } from "@/Config/wallet";
import { useAddUserMutation, useGetAllUsersQuery, useGetUserByEmailQuery } from "@/Services";
import React, { useState } from "react";
import { ScrollView } from "react-native";
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

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllUsersQuery();

    // const { data: users, isFetching, isSuccess } = useGetUserByEmailQuery("phuongngovan2003@gmail.com");

    const [addUser] = useAddUserMutation();

    let content;

    if (isLoading) {
      content = <Loading />;
    } 
    else if (isSuccess) {
      content = users.map(user => <Text key={user.id}>{user.name}</Text>);
    } 
    else if (isError) {
      content = <Text>{error.toString()}</Text>
    }

    async function onAddUser() {
        try {
            await addUser({
                name: "Phuong",
                email: "phuong@ngo.van",
                password: "123"
            }).unwrap()
                .then((data) => console.log("fulfilled", data))
                .catch((error) => console.error("rejected", error));
        } catch (err) {
            console.error("Failed: ", err);
        }
    }

    return (
        <ScrollView>
            <Text>Hello</Text>
            <Text>Wallet: {walletId}</Text>
            <Text>Category: {category}</Text>
            <Text>Wallet Type: {walletType}</Text>
            <Text>Amount: {parseFloat(amount.replace(/[^0-9.]/g, '')).toLocaleString('en')}</Text>

            <Button mode="contained" onPress={() => setWalletVisible(true)}>Select Wallet Here</Button>
            <Button mode="contained" onPress={() => setCategoryVisible(true)}>Select Category Here</Button>
            <Button mode="contained" onPress={() => setWalletTypeVisible(true)}>Select Wallet Type Here</Button>
            <Button mode="contained" onPress={() => setAmountVisible(true)}>Input Amount Here</Button>

            <Text>API Test:</Text>
            {content}
            <Button mode="contained" onPress={onAddUser}>Add user Phuong</Button>

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
        </ScrollView>
    )
}