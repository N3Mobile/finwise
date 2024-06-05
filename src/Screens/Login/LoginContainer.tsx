import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Logo } from "@/Components";
import { RootScreens } from "@/Screens";
import { Colors } from "@/Theme";
import { Button, TextInput, Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useUser } from "@/Components/UserContext";
import { LocalizationKey, i18n } from "@/Localization";
interface State {
  value: string;
  error: string;
}

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.WELCOME]: undefined;
  [RootScreens.SETTINGS]: undefined;
  [RootScreens.LOGIN]: undefined;
  [RootScreens.SIGNUP]: undefined;
  [RootScreens.PASSWORDCHANGE]: undefined;
};

export const LoginContainer = () => {
  const [email, setEmail] = useState<State>({ value: "", error: "" });
  const [password, setPassword] = useState<State>({ value: "", error: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setUserId } = useUser();
  const emailValidator = (email: string): string => {
    const re = /\S+@\S+\.\S+/;
    if (!email) return i18n.t(LocalizationKey.LOGIN_EMAIL_EMPTY);
    // if (!re.test(email)) return 'Địa chỉ email chưa hợp lệ.';
    return "";
  };
  const passwordValidator = (password: string): string => {
    if (password.length < 5)
      return i18n.t(LocalizationKey.LOGIN_PASSWORD_EMPTY);
    return "";
  };

  const handleEmailChange = (email: string) => {
    setEmail({ value: email, error: "" });
  };

  const handlePasswordChange = (password: string) => {
    setPassword({ value: password, error: "" });
  };

  const onLoginPressed = async () => {
    setSubmitted(true);

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    setEmail({ ...email, error: emailError });
    setPassword({ ...password, error: passwordError });

    if (emailError || passwordError) return;

    const url = `https://be-mobile-n3.onrender.com/Users/login?email=${encodeURIComponent(
      email.value
    )}&password=${encodeURIComponent(password.value)}`;

    try {
      const response = await axios.get(url);
      const user = response.data;

      if (user && user.id) {
        setUserId(user.id);
        navigation.navigate(RootScreens.MAIN);
      }
    } catch (error) {
      setPassword({
        ...password,
        error: i18n.t(LocalizationKey.LOGIN_INVALID_CREDENTIALS),
      });
    }
  };

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Appbar.Header>
        <Appbar.Content title={i18n.t(LocalizationKey.LOGIN_BUTTON)} />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <View style={styles.container}>
            <Logo style={styles.image} />
            <Text style={styles.title}>Finwise</Text>
            <TextInput
              placeholder="Email"
              returnKeyType="next"
              value={email.value}
              onChangeText={handleEmailChange}
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              style={[styles.input, password.error ? styles.inputError : null]}
              contentStyle={styles.content}
              activeUnderlineColor="gray"
            />
            {submitted && email.error ? (
              <Text style={styles.errorText}>{email.error}</Text>
            ) : null}
            <TextInput
              placeholder={i18n.t(LocalizationKey.LOGIN_PASSWORD_PLACEHOLDER)}
              returnKeyType="done"
              value={password.value}
              onChangeText={handlePasswordChange}
              autoCapitalize="none"
              autoComplete="password"
              secureTextEntry
              style={[styles.input, password.error ? styles.inputError : null]}
              contentStyle={styles.content}
              activeUnderlineColor="gray"
            />
            {submitted && password.error ? (
              <Text style={styles.errorText}>{password.error}</Text>
            ) : null}
            <View style={styles.forgotPassword}>
              <TouchableOpacity
                onPress={() => navigation.navigate(RootScreens.PASSWORDCHANGE)}
              >
                <Text style={styles.forgot}>
                  {i18n.t(LocalizationKey.LOGIN_FORGOT_PASSWORD)}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.login} onPress={onLoginPressed}>
              <Button
                mode="contained"
                labelStyle={styles.content}
                style={styles.button}
                buttonColor={Colors.SUFACE_TINT_COLOR}
              >
                {i18n.t(LocalizationKey.LOGIN_BUTTON)}
              </Button>
            </TouchableOpacity>

            <View style={styles.row}>
              <Text>{i18n.t(LocalizationKey.LOGIN_NO_ACCOUNT)} </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(RootScreens.SIGNUP)}
              >
                <Text style={styles.link}>
                  {i18n.t(LocalizationKey.LOGIN_SIGNUP_LINK)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 24,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    padding: 8,
    marginVertical: 12,
    backgroundColor: Colors.NEUTRAL99,
  },
  content: {
    fontSize: 18,
  },
  inputError: {
    borderColor: Colors.ERROR60,
  },
  image: {
    width: 80,
    height: 80,
  },
  errorText: {
    color: Colors.ERROR60,
    marginTop: 4,
    marginBottom: 8,
  },
  button: {
    width: "80%",
    padding: 6,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 40,
  },
  link: {
    fontWeight: "bold",
  },
  login: {
    marginTop: 60,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPassword: {
    width: "80%",
    alignItems: "flex-end",
    marginBottom: 24,
  },

  forgot: {
    fontSize: 13,
    color: "#bbbbbb",
  },
});
