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
  Alert,
} from "react-native";
import { Logo } from "@/Components";
import { RootScreens } from "@/Screens";
import { Colors } from "@/Theme";
import { Button, TextInput, Checkbox, Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
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
};

export const SignupContainer = () => {
  const [name, setName] = useState<State>({ value: "", error: "" });
  const [email, setEmail] = useState<State>({ value: "", error: "" });
  const [password, setPassword] = useState<State>({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState<State>({
    value: "",
    error: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const nameValidator = (name: string): string => {
    if (!name) return i18n.t(LocalizationKey.NAME_REQUIRED);
    return "";
  };

  const emailValidator = (email: string): string => {
    const re = /\S+@\S+\.\S+/;
    if (!email) return i18n.t(LocalizationKey.LOGIN_EMAIL_EMPTY);
    // if (!re.test(email)) return "Địa chỉ email chưa hợp lệ.";
    return "";
  };

  const passwordValidator = (password: string): string => {
    // if (!password) return "Mật khẩu không được để trống.";
    if (password.length < 5)
      return i18n.t(LocalizationKey.LOGIN_PASSWORD_EMPTY);
    return "";
  };

  const handleNameChange = (name: string) => {
    setName({ value: name, error: "" });
  };

  const handleEmailChange = (email: string) => {
    setEmail({ value: email, error: "" });
  };

  const handlePasswordChange = (password: string) => {
    setPassword({ value: password, error: "" });
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setConfirmPassword({ value: confirmPassword, error: "" });
  };

  const onSignupPressed = async () => {
    setSubmitted(true);

    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError =
      confirmPassword.value !== password.value
        ? i18n.t(LocalizationKey.PASSWORD_MISMATCH)
        : "";

    setName({ ...name, error: nameError });
    setEmail({ ...email, error: emailError });
    setPassword({ ...password, error: passwordError });
    setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });

    if (
      !nameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      checked
    ) {
      try {
        const response = await axios.post(
          "https://be-mobile-n3.onrender.com/Users/new",
          {
            name: name.value,
            email: email.value,
            password: password.value,
          }
        );

        Alert.alert(
          i18n.t(LocalizationKey.SUCCESS),
          i18n.t(LocalizationKey.REGISTRATION_SUCCESS)
        );
        navigation.goBack();
      } catch (error) {
        console.error(error);
        setPassword({
          ...password,
          error: i18n.t(LocalizationKey.LOGIN_TRY_AGAIN),
        });
      }
    } else if (!checked) {
      Alert.alert(
        i18n.t(LocalizationKey.NOTIFY),
        i18n.t(LocalizationKey.AGREEMENT_REQUIRED)
      );
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
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={i18n.t(LocalizationKey.SIGN_UP)} />
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
              placeholder={i18n.t(LocalizationKey.NAME)}
              returnKeyType="next"
              value={name.value}
              onChangeText={handleNameChange}
              autoCapitalize="none"
              autoComplete="name"
              textContentType="name"
              style={[styles.input, name.error ? styles.inputError : null]}
              contentStyle={styles.content}
              activeUnderlineColor="gray"
            />
            {name.error ? (
              <Text style={styles.errorText}>{name.error}</Text>
            ) : null}
            <TextInput
              placeholder="Email"
              returnKeyType="next"
              value={email.value}
              onChangeText={handleEmailChange}
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              style={[styles.input, email.error ? styles.inputError : null]}
              contentStyle={styles.content}
              activeUnderlineColor="gray"
            />
            {email.error ? (
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
            {password.error ? (
              <Text style={styles.errorText}>{password.error}</Text>
            ) : null}
            <TextInput
              placeholder={i18n.t(LocalizationKey.CONFIRM_NEW_PASSWORD)}
              returnKeyType="done"
              value={confirmPassword.value}
              onChangeText={handleConfirmPasswordChange}
              autoCapitalize="none"
              autoComplete="password"
              secureTextEntry
              style={[
                styles.input,
                confirmPassword.error ? styles.inputError : null,
              ]}
              contentStyle={styles.content}
              activeUnderlineColor="gray"
            />
            {confirmPassword.error ? (
              <Text style={styles.errorText}>{confirmPassword.error}</Text>
            ) : null}

            <View style={styles.checkboxContainer}>
              <View style={styles.backgroundcheckbox}>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => setChecked(!checked)}
                  color={Colors.SUFACE_TINT_COLOR}
                  uncheckedColor={Colors.SUFACE_TINT_COLOR}
                />
              </View>

              <Text style={styles.checkboxText}>
                {/* Với việc đăng ký, bạn đã đồng ý với{" "}
                <Text style={styles.linkText}>Điều khoản sử dụng</Text> và{" "}
                <Text style={styles.linkText}>chính sách bảo mật</Text> của
                chúng tôi */}
                {i18n.t(LocalizationKey.REGISTRATION_TERMS)}
              </Text>
            </View>

            <TouchableOpacity style={styles.signup} onPress={onSignupPressed}>
              <Button
                mode="contained"
                labelStyle={styles.content}
                style={styles.button}
                buttonColor={Colors.SUFACE_TINT_COLOR}
              >
                {i18n.t(LocalizationKey.SIGN_UP)}
              </Button>
            </TouchableOpacity>

            <View style={styles.row}>
              <Text>{i18n.t(LocalizationKey.ALREADY_HAVE_ACCOUNT)} </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.link}>
                  {i18n.t(LocalizationKey.LOGIN_BUTTON)}
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
  signup: {
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: "#bbbbbb",
  },
  checkboxContainer: {
    marginTop: 30,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  checkboxText: {
    fontSize: 14,
    marginLeft: 12,
    flexShrink: 1,
  },
  linkText: {
    color: Colors.PRIMARY,
  },
  backgroundcheckbox: {
    backgroundColor: "lightgray",
    borderRadius: 16,
  },
});

export default SignupContainer;
