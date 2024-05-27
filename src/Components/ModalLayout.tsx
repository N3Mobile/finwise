import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { Modal, Portal } from "react-native-paper";

interface Props {
    modalVisible: boolean,
    setModalVisible: Dispatch<SetStateAction<boolean>>,
    children: ReactNode
}

export const ModalLayout: FC<Props> = ({ modalVisible, setModalVisible, children }) => {
    return (
        <Portal>
            <Modal
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                style={{ 
                    marginTop: 0,
                    flex: 1, 
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: "flex-start",
                }}
                contentContainerStyle={{
                    height: '100%'
                }}
            >
                {children}
            </Modal>
        </Portal>
    )
}