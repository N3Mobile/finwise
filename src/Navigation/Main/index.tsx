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


const Tab = createMaterialBottomTabNavigator();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      
    >
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarLabel: i18n.t(LocalizationKey.HOME),
          tabBarIcon: ({ color }) => (
            <Icon source={Icons.HOME} size={26} color={color}/>
          ),
        }}
      />
      <Tab.Screen 
        name="History"
        component={History}
        options={{
          tabBarLabel: i18n.t(LocalizationKey.TRANSACTIONS),
          tabBarIcon: ({ color }) => (
            <Icon source={Icons.HISTORY} size={26} color={color}/>
          ),
        }}
        initialParams={{start : -1, end: -1, category: 'all'}}
      />
      <Tab.Screen
        name="AddTransaction"
        component={AddTransactionContainer}
        options={{
          tabBarLabel: i18n.t(LocalizationKey.ADD),
          tabBarIcon: ({ color }) => (
            <Icon source={Icons.PLUS} size={26} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Wallets"
        component={WalletsContainer}
        options={{
          tabBarLabel: i18n.t(LocalizationKey.WALLETS),
          tabBarIcon: ({ color }) => (
            <Icon source={Icons.WALLET} size={26} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Budgets"
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
