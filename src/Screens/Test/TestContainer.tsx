import { Loading, ScreenWrapper } from "@/Components";
import { InputAmount } from "@/Components/InputAmount";
import { SelectCategory } from "@/Components/SelectCategory";
import { SelectWallet } from "@/Components/SelectWallet";
import { SelectWalletType } from "@/Components/SelectWalletType";
import { Category } from "@/Config/category";
import { WalletType } from "@/Config/wallet";
import { StackNavigation } from "@/Navigation";
import { useAddUserMutation, useGetAllUsersQuery, useGetUserByEmailQuery } from "@/Services";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { Button, Portal, Text } from "react-native-paper";
import { RootScreens, TabScreens } from "..";
import { http } from "@/Hooks/api";
import { Wallet } from "@/Services/wallets";

export const TestContainer = () => {
    const navigation = useNavigation<StackNavigation>();
    const [walletId, setWalletId] = useState("");
    const [category, setCategory] = useState(Category.ALL);
    const [walletType, setWalletType] = useState(WalletType.CASH);
    const [amount, setAmount] = useState('0');

    const [walletVisible, setWalletVisible] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [walletTypeVisible, setWalletTypeVisible] = useState(false);
    const [amountVisible, setAmountVisible] = useState(false);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [wallets, setWallets] = useState<Wallet[]>([]);

    useFocusEffect(
        useCallback(() => {
            http.get('wallets/byUsersId', { user_ID: "" })
                .then(data => {
                    setWallets(data);
                    setLoading(false);
                }).catch(error => setError(error.toString()));
        }, [])
    );
    
    return (
        <ScreenWrapper
            loading={loading}
            error={error}
            backToHome={() => navigation.navigate(RootScreens.MAIN, { screen: TabScreens.HOME })}
        >
            <ScrollView>
                <Text>Hello</Text>
                <Text>Wallet ID: {walletId}</Text>
                <Text>Category: {category}</Text>
                <Text>Wallet Type: {walletType}</Text>
                <Text>Amount: {parseFloat(amount.replace(/[^0-9.]/g, '')).toLocaleString('en')}</Text>

                <Button mode="contained" onPress={() => setWalletVisible(true)}>Select Wallet Here</Button>
                <Button mode="contained" onPress={() => setCategoryVisible(true)}>Select Category Here</Button>
                <Button mode="contained" onPress={() => setWalletTypeVisible(true)}>Select Wallet Type Here</Button>
                <Button mode="contained" onPress={() => setAmountVisible(true)}>Input Amount Here</Button>
                <Button mode="contained" onPress={() => setLoadingVisible(true)}>Show Loading</Button>
                <Button mode="contained" onPress={() => setErrorVisible(true)}>Show Error</Button>
                
                <Text>API Test - Wallet List:</Text>
                { wallets.map(wal => <Text>{wal.name}</Text>)}

                {/* <Button mode="contained" onPress={onAddUser}>Add user Phuong</Button> */}

                <Portal>
                    <SelectWallet 
                        visible={walletVisible} 
                        setVisible={setWalletVisible} 
                        wallets={wallets}
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