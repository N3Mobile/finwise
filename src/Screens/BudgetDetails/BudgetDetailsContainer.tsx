import React, { FC, useCallback, useEffect, useState } from "react";
import { BudgetDetails } from "./BudgetDetails";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens, TabScreens } from "..";
import { Appbar, Button, Dialog, Portal, Text } from "react-native-paper";
import { LocalizationKey, i18n } from "@/Localization";
import { CustomAppbar } from "@/Navigation/Appbar/CustomAppbar";
import { useFocusEffect } from "@react-navigation/native";
import { http } from "@/Hooks/api";
import { DEFAULT_BUDGET } from "@/Services/budgets";
import { ScreenWrapper } from "@/Components";

type Props = NativeStackScreenProps<RootStackParamList, RootScreens.BUDGET_DETAILS>;

export const BudgetDetailsContainer: FC<Props> = ({ navigation, route }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [budget, setBudget] = useState(DEFAULT_BUDGET);

    useFocusEffect(
        useCallback(() => {
            setError("");
            http.get('budgets/ids', { _id: route.params.budgetId })
                .then(data => {
                    setBudget(data);
                    setLoading(false);
                })
                .catch(error => setError(error.toString()));
        }, [])
    );

    const [deleteVisible, setDeleteVisible] = useState(false);

    function onEdit() {
        navigation.navigate(RootScreens.EDIT_BUDGET, { budgetId: route.params.budgetId });
    }
    function onDelete() {
        setDeleteVisible(true);
    }
    
    function onShowTransactions() {
        navigation.navigate(RootScreens.MAIN, { 
            screen: TabScreens.TRANSACTIONS, 
            params: { 
                start: budget.start_date,
                end: budget.end_date,
                category: budget.category
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
        <ScreenWrapper loading={loading} error={error} backToHome={() => { navigation.navigate(RootScreens.MAIN, { screen: TabScreens.HOME }) }}>
            <BudgetDetails 
                budget={budget} 
                onShowTransactions={onShowTransactions}
                setLoading={setLoading}
                setError={setError}
            />
            <Portal>
                <Dialog visible={deleteVisible} onDismiss={() => setDeleteVisible(false)}>
                    <Dialog.Content>
                        <Text>Are u sure?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDeleteVisible(false)}>
                        {i18n.t(LocalizationKey.CANCEL)}
                        </Button>
                        <Button onPress={() => {
                            
                            http.delete('budgets', { _id: budget.id }, null)
                                .then(data => {
                                    console.log("deleted");
                                    setDeleteVisible(false);
                                    navigation.goBack();
                                })
                                .catch(error => setError(error.toString()));

                        }}>
                            {i18n.t(LocalizationKey.CONFIRM)}
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScreenWrapper>
    )
}