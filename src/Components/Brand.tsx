import { Colors } from "@/Theme";
import { Sriracha_400Regular, useFonts } from "@expo-google-fonts/sriracha";
import React, { FC } from "react";
import { Text } from "react-native";

export const Brand: FC<{size: number}> = ({ size }) => {
    let [fontsLoaded, fontError] = useFonts({Sriracha_400Regular});

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <Text style={{ 
            fontFamily: "Sriracha_400Regular", 
            color: Colors.PRIMARY,
            fontSize: size
            }}>
                Finwise
        </Text>
    )
}