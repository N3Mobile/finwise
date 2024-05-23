import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { TransactionsContainer } from "@/Screens/Transactions";
import { AddTransactionContainer } from "@/Screens/AddTransaction";
import { WalletsContainer } from "@/Screens/Wallets";
import { BudgetsContainer } from "@/Screens/Budgets";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { History } from "@/Screens/History/History";

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
    
        }}
      />
      <Tab.Screen 
        name="History"
        component={History}
        options={{

        }}
      />
      <Tab.Screen
        name="AddTransaction"
        component={AddTransactionContainer}
        options={{
 
        }}
      />
      <Tab.Screen
        name="Wallets"
        component={WalletsContainer}
        options={{

        }}
      />
      <Tab.Screen
        name="Budgets"
        component={BudgetsContainer}
        options={{
  
        }}
      />
    </Tab.Navigator>
  );
};
