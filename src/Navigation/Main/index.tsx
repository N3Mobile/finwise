import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { TransactionsContainer } from "@/Screens/Transactions";
import { AddTransactionContainer } from "@/Screens/AddTransaction";
import { WalletsContainer } from "@/Screens/Wallets";
import { BudgetsContainer } from "@/Screens/Budgets";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";

import { History } from "@/Screens/History/History";

import { LocalizationKey, i18n } from "@/Localization";
import { Icon } from "react-native-paper";
import { Icons } from "@/Theme";
import { TabScreens } from "@/Screens";
import { NavigationProp } from "@react-navigation/native";


const Tab = createMaterialBottomTabNavigator();
export type BottomTabParamList = {
  [TabScreens.HOME]: undefined,
  [TabScreens.TRANSACTIONS]: { start: string, end: string, category: string },
  [TabScreens.ADD]: undefined,
  [TabScreens.WALLETS]: undefined,
  [TabScreens.BUDGETS]: undefined
}
export type TabNavigation = NavigationProp<BottomTabParamList>;

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      
    >
      <Tab.Screen
        name={TabScreens.HOME}
        component={HomeContainer}
        options={{
          tabBarLabel: i18n.t(LocalizationKey.HOME),
          tabBarIcon: ({ color }) => (
            <Icon source={Icons.HOME} size={26} color={color}/>
          ),
        }}
      />
      <Tab.Screen 

        name={TabScreens.TRANSACTIONS}
        component={History}
        initialParams={{ start: (new Date(-8640000000000000)).toDateString(), end: new Date().toDateString(), category: "all", walletId: '' }}

        options={{
          tabBarLabel: i18n.t(LocalizationKey.TRANSACTIONS),
          tabBarIcon: ({ color }) => (
            <Icon source={Icons.HISTORY} size={26} color={color}/>
          ),
        }}

      />
      <Tab.Screen
        name={TabScreens.ADD}
        component={AddTransactionContainer}
        options={{
          tabBarLabel: i18n.t(LocalizationKey.ADD),
          tabBarIcon: ({ color }) => (
            <Icon source={Icons.PLUS} size={26} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name={TabScreens.WALLETS}
        component={WalletsContainer}
        options={{
          tabBarLabel: i18n.t(LocalizationKey.WALLETS),
          tabBarIcon: ({ color }) => (
            <Icon source={Icons.WALLET} size={26} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name={TabScreens.BUDGETS}
        component={BudgetsContainer}
        options={{
          tabBarLabel: i18n.t(LocalizationKey.BUDGETS),
          tabBarIcon: ({ color }) => (
            <Icon source={Icons.BUDGET} size={26} color={color}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
