import React from "react";
import { StatusBar } from "react-native";
import { NativeStackHeaderProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { WelcomeContainer } from "@/Screens/Welcome";
import { RootScreens } from "@/Screens";
import { SettingsContainer } from "@/Screens/Settings";
import { NavigationBar } from "./NavigationBar";
import { LoginContainer } from "@/Screens/Login";
import { SignupContainer } from "@/Screens/Signup";
import { TransferMoneyContainer } from "@/Screens/TransferMoney";
import { EditWalletContainer } from "@/Screens/EditWallet";

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.WELCOME]: undefined;
  [RootScreens.SETTINGS]: undefined;
  [RootScreens.LOGIN]: undefined;
  [RootScreens.SIGNUP]: undefined;
  [RootScreens.TRANSFER_MONEY]: { wallet_id: number };
  [RootScreens.EDIT_WALLET]: { wallet_id: number };
};
export type StackNavigation = NavigationProp<RootStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator screenOptions={{ 
        header: (props: NativeStackHeaderProps) => <NavigationBar {...props} />,
        // headerShown: false
      }}>
        <RootStack.Screen
          name={RootScreens.WELCOME}
          component={WelcomeContainer}
        />
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.SETTINGS}
          component={SettingsContainer}
        />
        <RootStack.Screen
          name={RootScreens.LOGIN}
          component={LoginContainer}
        />
        <RootStack.Screen
          name={RootScreens.SIGNUP}
          component={SignupContainer}
        />
        
        <RootStack.Screen 
          name={RootScreens.TRANSFER_MONEY}
          component={TransferMoneyContainer}
        />
        <RootStack.Screen
          name={RootScreens.EDIT_WALLET}
          component={EditWalletContainer}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
