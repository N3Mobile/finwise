import { View } from "native-base";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Logo } from "./Logo";
import { Brand } from "./Brand";
import { ActivityIndicator, Text } from "react-native-paper";
import { Language, LocalizationKey, i18n } from "@/Localization";
import { Colors } from "@/Theme";

export const Loading = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Logo />
                <Brand size={48}/>
                { i18n.locale === Language.ENGLISH 
                    ?
                    <View style={styles.slogan}>
                        <Text>Make wise financial moves with <Brand size={16} /></Text>
                    </View> 
                    :
                    <View style={styles.slogan}>
                        <Text style={{ fontSize: 20 }}>Tài chính thông minh</Text>
                        <Text style={{ fontSize: 20 }}>dẫn bước cùng <Brand size={20} /></Text>
                    </View>
                }
            </View>
            <View style={styles.loading}>
                <ActivityIndicator animating={true} size={50} color={Colors.PRIMARY}/>
                <Text>{i18n.t(LocalizationKey.LOADING)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 120,
        gap: 20,
        backgroundColor: Colors.NEUTRAL99,
        height: '100%'
    },
    logo: {
        alignItems: 'center'
    },
    slogan: {
        alignItems: 'center'
    },
    loading: {
        display: 'flex',
        gap: 20,
        position: 'absolute',
        bottom: 0,
        marginBottom: 100   
    }
})