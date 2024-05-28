import React, { FC, useEffect, useState } from "react";
import { BudgetDetails } from "./BudgetDetails";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens, TabScreens } from "..";
import { Appbar, Button, Dialog, Portal, Text } from "react-native-paper";
import { LocalizationKey, i18n } from "@/Localization";
import { CustomAppbar } from "@/Navigation/Appbar/CustomAppbar";

type Props = NativeStackScreenProps<RootStackParamList, RootScreens.BUDGET_DETAILS>;

export const BudgetDetailsContainer: FC<Props> = ({ navigation, route }) => {

    const fakeBudget = {
        id: 3,
        name: "Entertainment",
        wallet_id: 1,
        category: "bill",
        initial_amount: 2000000,
        amount: 4000,
        start_date: '20/05/2024',
        end_date: '26/05/2024'
    };

    const [deleteVisible, setDeleteVisible] = useState(false);

    function onEdit() {
        navigation.navigate(RootScreens.EDIT_BUDGET, { budgetId: fakeBudget.id });
    }
    function onDelete() {
        setDeleteVisible(true);
    }
    function onShowTransactions() {
        navigation.navigate(RootScreens.MAIN, { 
            screen: TabScreens.TRANSACTIONS, 
            params: { 
                start: fakeBudget.start_date,
                end: fakeBudget.end_date,
                category: fakeBudget.category
            } 
        });
    }

    useEffect(() => {
        navigation.setOptions({
            header: (props) =>
                <CustomAppbar {...props}>
                    <Appbar.Action icon="pencil" onPress={onEdit} />
                    <Appbar.Action icon="trash-can" onPress={onDelete} />
                </CustomAppbar>
        });
    }, []);

    return (
        <>
            <BudgetDetails budget={fakeBudget} onShowTransactions={onShowTransactions}/>
            <Portal>
                <Dialog visible={deleteVisible} onDismiss={() => setDeleteVisible(false)}>
                    <Dialog.Content>
                        <Text>Are u sure?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={onDelete}>
                            {i18n.t(LocalizationKey.CONFIRM)}
                        </Button>
                        <Button onPress={() => {
                            // ...
                            setDeleteVisible(false);
                        }}>
                            {i18n.t(LocalizationKey.CANCEL)}
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    )
}