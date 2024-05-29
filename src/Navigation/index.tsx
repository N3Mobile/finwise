import React from "react";
import { StatusBar } from "react-native";
import { NativeStackHeaderProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, NavigationProp, NavigatorScreenParams } from "@react-navigation/native";
import { BottomTabParamList, MainNavigator } from "./Main";
import { WelcomeContainer } from "@/Screens/Welcome";
import { RootScreens } from "@/Screens";
import { SettingsContainer } from "@/Screens/Settings";
import { LoginContainer } from "@/Screens/Login";
import { SignupContainer } from "@/Screens/Signup";
import { TestContainer } from "@/Screens/Test";
import { DefaultAppbar } from "./Appbar/DefaultAppbar";
import { MainAppbar } from "./Appbar/MainAppbar";

export type RootStackParamList = {
  [RootScreens.MAIN]: NavigatorScreenParams<BottomTabParamList>;
  [RootScreens.WELCOME]: undefined;
  [RootScreens.SETTINGS]: undefined;
  [RootScreens.LOGIN]: undefined;
  [RootScreens.SIGNUP]: undefined;
  [RootScreens.TRANSFER_MONEY]: { wallet_id: string };
  [RootScreens.ADD_WALLET]: undefined;
  [RootScreens.EDIT_WALLET]: { wallet_id: string };
  [RootScreens.TEST]: undefined;
};
export type StackNavigation = NavigationProp<RootStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator screenOptions={{ 
        header: (props) => <DefaultAppbar {...props} />,
      }}>
        <RootStack.Screen
          name={RootScreens.WELCOME}
          component={WelcomeContainer}
          options={{
            headerShown: false
          }}
        />
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
          options={{
            header: (props) => <MainAppbar {...props} />
          }}
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
          name={RootScreens.TEST}
          component={TestContainer}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
