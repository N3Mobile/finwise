import React, { useState, useEffect, useCallback} from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { List, Button, Portal, Text } from "react-native-paper";
import { Icons, Colors } from "@/Theme";
import { Calendar, DateData } from "react-native-calendars";
import { SelectCategory } from "@/Components/SelectCategory";
import { LocalizationKey, i18n } from "@/Localization";
import { SelectWallet } from "@/Components/SelectWallet";
import axios from "axios";
import { ScreenWrapper } from "@/Components";
import { useCategoryIcon } from "@/Hooks/icon";
import { useUser } from "@/Components/UserContext";
import { useFocusEffect } from "@react-navigation/native";
const CurrencyDisplay = () => (
  <View style={styles.currencyContainer}>
    <Text style={styles.currencyText}>{i18n.t(LocalizationKey.UNIT)}</Text>
  </View>
);

export const AddTransactionContainer = () => {
  const [amount, setAmount] = useState("0");
  const [note, setNote] = useState<string>("");
  const [transactionType, setTransactionType] = useState("Chi");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedWallet, setSelectedWallet] = useState<string>(
    i18n.t(LocalizationKey.SELECT_WALLET)
  );
  const [balance, setBalance] = useState<number>(0);
  const [isWalletListVisible, setIsWalletListVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSelectCategoryVisible, setIsSelectCategoryVisible] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [walletId, setWalletId] = useState("");
  const [loadingWallets, setLoadingWallets] = useState(true);
  const [loadingWalletId, setLoadingWalletId] = useState(true);
  const [error, setError] = useState("");
  const [name, icon, color] = useCategoryIcon(selectedCategory);
  const { userId } = useUser();
  const handleAmountChange = (value: string) => {
    let numericValue = value.replace(/[^0-9.]/g, "");
    if (
      numericValue === "0" ||
      (numericValue.startsWith("0") && numericValue !== "0")
    ) {
      numericValue = numericValue.replace(/^(0*)(?!$)/, "");
    }
    const parts = numericValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formattedValue = parts.join(".");

    setAmount(formattedValue);
  };
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  const screenNameColor =
    transactionType === "Thu" ? Colors.SUFACE_TINT_COLOR : Colors.ERROR60;

  const getFormattedDate = (date: Date) => {
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  const handleDateSelect = (day: DateData) => {
    setSelectedDate(new Date(day.dateString));
    setMarkedDates({
      [day.dateString]: { selected: true, selectedColor: "#466A8F" },
    });
    setIsCalendarVisible(false);
  };

  const fetchWallets = async () => {
    setLoadingWallets(true);
    setError("");

     try {
      const response = await axios.get(
        `https://be-mobile-n3.onrender.com/wallets/byUsersId?user_ID=${userId}`
      );
      const wallet = response.data;
      setWallets(wallet);
    } catch (err) {
      setError("Lỗi khi tải danh sách ví");
      console.error("Lỗi", err);
    } finally {
      setLoadingWallets(false);
    }
  };
  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWalletId = async () => {
    if (!walletId) return;
    setLoadingWalletId(true);
    setError("");

    try {
      const url = `https://be-mobile-n3.onrender.com/wallets/byWalletsId?_id=${encodeURIComponent(
        walletId
      )}`;
      const response = await axios.get(url);
      const wallet = response.data;
      setSelectedWallet(wallet.name);
      setBalance(wallet.amount);
    } catch (err) {
      setError("Lỗi khi tải ví");
      console.error("Lỗi", err);
    } finally {
      setLoadingWalletId(false);
    }
  };

  useEffect(() => {
    fetchWalletId();
  }, [walletId]);
  useFocusEffect(
    useCallback(() => {
      fetchWallets();
      fetchWalletId();
    }, [walletId])
  );
  const handleSaveTransaction = async () => {
    const amountWithoutCommas = amount.replace(/,/g, "");
    const transaction = {
      wallet_id: walletId,
      category: selectedCategory,
      amount: parseFloat(amountWithoutCommas),
      created_at: selectedDate.toISOString(),
      is_pay: transactionType === "Chi" ? true : false,
      note_info: note,
    };

    try {
      const response = await fetch(
        "https://be-mobile-n3.onrender.com/transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transaction),
        }
      );

      if (response.ok) {
        Alert.alert("Thành công", "Giao dịch đã được lưu");
        fetchWallets();
        setSelectedWallet( i18n.t(LocalizationKey.SELECT_WALLET))
        setBalance(0)
        setAmount("0");
        setNote("");
        setSelectedCategory(""); 
      } else {
        Alert.alert("Lỗi", "Không thể lưu giao dịch");
      }
    } catch (error) {
      // console.error("Lỗi lưu giao dịch:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi lưu giao dịch");
    }
  };

  return (
    <ScreenWrapper
      loading={loadingWalletId && loadingWallets}
      error={error}
      backToHome={() => {}}
    >
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <Text
              style={[styles.screenName, { backgroundColor: screenNameColor }]}
            >
              {i18n.translate(LocalizationKey.CREATE_TRANSACTION)}
            </Text>
            <List.Section>
              <List.Item
                title={i18n.t(LocalizationKey.WALLET)}
                description={selectedWallet}
                left={() => (
                  <List.Icon
                    color={
                      transactionType === "Thu"
                        ? Colors.SUFACE_TINT_COLOR
                        : Colors.ERROR60
                    }
                    icon="wallet"
                  />
                )}
                right={() => (
                  <View style={styles.rightContent}>
                    <Text style={styles.balance}>{balance.toString()}</Text>
                    <CurrencyDisplay />
                  </View>
                )}
                style={styles.listItem}
                titleStyle={styles.title}
                descriptionStyle={styles.description}
                onPress={() => setIsWalletListVisible(!isWalletListVisible)}
              />
              <List.Item
                title={i18n.translate(LocalizationKey.TRANSACTION_TYPE)}
                titleStyle={styles.description}
                descriptionStyle={styles.description}
                left={() => (
                  <List.Icon
                    color={
                      transactionType === "Thu"
                        ? Colors.SUFACE_TINT_COLOR
                        : Colors.ERROR60
                    }
                    icon="credit-card"
                  />
                )}
                right={() => (
                  <View style={styles.transactionTypeContainer}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setTransactionType("Thu");
                        setSelectedCategory(
                          i18n.t(LocalizationKey.SELECT_CATEGORY)
                        );
                      }}
                    >
                      <View
                        style={[
                          styles.transactionTypeButton,
                          transactionType === "Thu" &&
                            styles.selectedIncomeType,
                        ]}
                      >
                        <Text style={styles.transactionTypeButtonText}>
                          {i18n.t(LocalizationKey.INCOME)}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setTransactionType("Chi");
                        setSelectedCategory(
                          i18n.t(LocalizationKey.SELECT_CATEGORY)
                        );
                      }}
                    >
                      <View
                        style={[
                          styles.transactionTypeButton,
                          transactionType === "Chi" &&
                            styles.selectedOutcomeType,
                        ]}
                      >
                        <Text style={styles.transactionTypeButtonText}>
                          {i18n.t(LocalizationKey.EXPENSE)}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                )}
                style={styles.listItem}
              />
              <List.Item
                title={i18n.translate(LocalizationKey.AMOUNT)}
                titleStyle={styles.title}
                descriptionStyle={styles.description}
                description={() => (
                  <TextInput
                    style={styles.description}
                    maxLength={20}
                    autoFocus={false}
                    value={amount}
                    keyboardType="number-pad"
                    onChangeText={handleAmountChange}
                    editable={true}
                  />
                )}
                left={() => (
                  <List.Icon
                    color={
                      transactionType === "Thu"
                        ? Colors.SUFACE_TINT_COLOR
                        : Colors.ERROR60
                    }
                    icon="cash"
                  />
                )}
                right={() => <CurrencyDisplay />}
                style={styles.listItem}
              />
               <List.Item
                title={i18n.t(LocalizationKey.NOTE)}
                titleStyle={styles.title}
                descriptionStyle={styles.description}
                description={() => (
                  <TextInput
                    style={styles.description}
                    maxLength={30}
                    autoFocus={false}
                    value={note}
                    onChangeText={setNote}
                    editable={true}
                    defaultValue={i18n.t(LocalizationKey.NOTE)}
                  />
                )}
                left={() => (
                  <List.Icon
                    color={
                      transactionType === "Thu"
                        ? Colors.SUFACE_TINT_COLOR
                        : Colors.ERROR60
                    }
                    icon="note-edit-outline"
                  />
                )}
                style={styles.listItem}
              />
              <List.Item
                title={i18n.t(LocalizationKey.CATEGORY)}
                titleStyle={styles.title}
                descriptionStyle={styles.description}
                description={
                  name==="Unknown" ? i18n.t(LocalizationKey.SELECT_CATEGORY):name
                }
                left={() => (
                  <List.Icon
                    color={
                      transactionType === "Thu"
                        ? Colors.SUFACE_TINT_COLOR
                        : Colors.ERROR60
                    }
                    icon={icon}
                  />
                )}
                right={() => (
                  <List.Icon
                    color={
                      transactionType === "Thu"
                        ? Colors.SUFACE_TINT_COLOR
                        : Colors.ERROR60
                    }
                    icon="chevron-right"
                  />
                )}
                style={styles.listItem}
                onPress={() => setIsSelectCategoryVisible(true)}
              />
              <List.Item
                title={toTitleCase(i18n.t(LocalizationKey.DAYS))}
                titleStyle={styles.title}
                descriptionStyle={styles.description}
                description={<Text>{getFormattedDate(selectedDate)}</Text>}
                left={() => (
                  <List.Icon
                    color={
                      transactionType === "Thu"
                        ? Colors.SUFACE_TINT_COLOR
                        : Colors.ERROR60
                    }
                    icon="calendar"
                  />
                )}
                // right={() => (
                //   <List.Icon
                //     color={
                //       transactionType === "Thu"
                //         ? Colors.SUFACE_TINT_COLOR
                //         : Colors.ERROR60
                //     }
                //     icon="chevron-right"
                //   />
                // )}
                style={styles.listItem}
                // onPress={() => setIsCalendarVisible(true)}
              />

             
              <Modal
                animationType="fade"
                transparent={true}
                visible={isCalendarVisible}
                onRequestClose={() => {
                  setIsCalendarVisible(false);
                }}
              >
                <TouchableWithoutFeedback onPress={handlePressOutside}>
                  <View style={styles.modal}>
                    <View style={styles.calendarContainer}>
                      <Calendar
                        style={styles.calendar}
                        theme={{ todayBackgroundColor: "cyan" }}
                        markedDates={markedDates}
                        onDayPress={handleDateSelect}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </List.Section>
            <View style={styles.ButtonContainer}>
              <Button
                style={styles.Button}
                mode="contained"
                buttonColor={
                  transactionType === "Thu"
                    ? Colors.SUFACE_TINT_COLOR
                    : Colors.ERROR60
                }
                onPress={handleSaveTransaction}
                disabled={
                  parseFloat(amount) <= 0 ||
                  amount === "" ||
                  selectedWallet === i18n.t(LocalizationKey.SELECT_WALLET) ||
                  selectedCategory === ""
                }
              >
                {i18n.t(LocalizationKey.SAVE)}
              </Button>
            </View>
          </View>
          <Portal>
            <SelectCategory
              visible={isSelectCategoryVisible}
              setVisible={setIsSelectCategoryVisible}
              all={true}
              income={transactionType === "Thu"}
              expense={transactionType === "Chi"}
              setCategory={setSelectedCategory}
            />
            <SelectWallet
              visible={isWalletListVisible}
              setVisible={setIsWalletListVisible}
              walletId={walletId}
              setWalletId={setWalletId}
              wallets={wallets}
            />
          </Portal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
};

// Styles cần được định nghĩa ở dưới

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollView: {
    flexGrow: 1,
  },
  screenName: {
    textAlign: "center",
    fontSize: 22,
    padding: 8,
    color: "white",
    alignContent: "center",
    fontWeight: "500",
  },
  shadowBox: {},
  keyboardContainer: {},

  currencyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: "500",
  },
  transactionTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  transactionTypeButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  selectedIncomeType: {
    backgroundColor: Colors.SUFACE_TINT_COLOR,
  },
  selectedOutcomeType: {
    backgroundColor: Colors.ERROR60,
  },
  transactionTypeButtonText: {
    fontSize: 14,
  },
  listItem: {
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    height: 70,
    justifyContent: "center",
  },
  categoryList: {
    paddingVertical: 10,
  },
  Item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 5,
    width: 100,
  },
  selectedItem: {
    backgroundColor: "#dddddd",
  },
  categoryText: {
    fontSize: 16,
  },
  categoryContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    borderWidth: 3,
    borderColor: "grey",
    borderRadius: 10,
    width: "100%",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  calendarContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    padding: 5,
  },
  description: {
    fontSize: 18,
    marginLeft: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5,
  },
  ButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  Button: {
    marginTop: 30,
    marginBottom: 30,
    width: "80%",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  balance: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default AddTransactionContainer;
