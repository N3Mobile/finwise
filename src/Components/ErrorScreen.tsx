import React, { FC } from "react";
import { ErrorIllustration } from "./ErrorIllustration";
import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import { Colors } from "@/Theme";

interface IErrorProps {
    message: string,
    backToHome: () => void
}

export const ErrorScreen: FC<IErrorProps> = ({ message, backToHome }) => {

    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 50
        }}>
            <ErrorIllustration />

            <View style={{ alignItems: 'center', gap: 10 }}>
                <Text style={{ fontSize: 50, color: Colors.PRIMARY70 }}>Oops!</Text>
                <Text style={{ fontSize: 20 }}>Something went wrong</Text>
                <Text style={{ 
                    height: 50,
                    width: 300,
                    textAlign: 'center',
                    overflow: 'hidden'
                }}>
                    {message === undefined ? "No error messages" : message}
                </Text>
            </View>

            <Button 
                mode="contained" 
                onPress={backToHome} 
                buttonColor={Colors.PRIMARY70}
                style={{
                    paddingVertical: 10
                }}
            >
                Back to Home
            </Button>
        </View>
    );
}