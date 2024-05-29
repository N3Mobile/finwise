import { View } from "native-base";
import React, { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet } from "react-native";
import { Logo } from "./Logo";
import { Brand } from "./Brand";
import { ActivityIndicator, Text } from "react-native-paper";
import { Language, LocalizationKey, i18n } from "@/Localization";
import { Colors } from "@/Theme";
import { ModalLayout } from "./ModalLayout";

interface ILoadingProps {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>
}

export const Loading: FC<ILoadingProps> = ({ visible, setVisible }) => {
    return (
        <ModalLayout modalVisible={visible} setModalVisible={setVisible}>
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
        </ModalLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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