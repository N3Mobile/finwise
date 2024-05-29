import { Loading, ScreenWrapper } from "@/Components";
import { InputAmount } from "@/Components/InputAmount";
import { SelectCategory } from "@/Components/SelectCategory";
import { SelectWallet } from "@/Components/SelectWallet";
import { SelectWalletType } from "@/Components/SelectWalletType";
import { Category } from "@/Config/category";
import { WalletType } from "@/Config/wallet";
import { StackNavigation } from "@/Navigation";
import { useAddUserMutation, useGetAllUsersQuery, useGetUserByEmailQuery } from "@/Services";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Button, Portal, Text } from "react-native-paper";
import { RootScreens, TabScreens } from "..";

export const TestContainer = () => {
    const navigation = useNavigation<StackNavigation>();
    const [walletId, setWalletId] = useState(0);
    const [category, setCategory] = useState(Category.ALL);
    const [walletType, setWalletType] = useState(WalletType.CASH);
    const [amount, setAmount] = useState('0');

    const [walletVisible, setWalletVisible] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [walletTypeVisible, setWalletTypeVisible] = useState(false);
    const [amountVisible, setAmountVisible] = useState(false);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllUsersQuery();

    // const { data: users, isFetching, isSuccess } = useGetUserByEmailQuery("phuongngovan2003@gmail.com");

    const [addUser] = useAddUserMutation();

    // let content;

    // if (isLoading) {
    //   content = <Text>Loading...</Text>;
    // } 
    // else if (isSuccess) {
    //   content = users.map(user => <Text key={user.id}>{user.name}</Text>);
    // } 
    // else if (isError) {
    //   content = <Text>{error.toString()}</Text>
    // }

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
        <ScreenWrapper
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
            backToHome={() => navigation.navigate(RootScreens.MAIN, { screen: TabScreens.HOME })}
        >
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
                <Button mode="contained" onPress={() => setLoadingVisible(true)}>Show Loading</Button>
                <Button mode="contained" onPress={() => setErrorVisible(true)}>Show Error</Button>
                
                <Text>API Test:</Text>
                { isSuccess ?
                    users.map(user => <Text key={user.id}>{user.name}</Text>)
                : null}

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
        </ScreenWrapper>
    )
}