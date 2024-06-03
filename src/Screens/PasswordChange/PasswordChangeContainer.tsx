import React, { useState } from 'react';
import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Logo } from '@/Components';
import { RootScreens } from '@/Screens';
import { Colors } from '@/Theme';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
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

export const PasswordChangeContainer = () => {
    const [email, setEmail] = useState<State>({ value: '', error: '' });
    const [currentPassword, setCurrentPassword] = useState<State>({ value: '', error: '' });
    const [newPassword, setNewPassword] = useState<State>({ value: '', error: '' });
    const [confirmNewPassword, setConfirmNewPassword] = useState<State>({ value: '', error: '' });
    const [submitted, setSubmitted] = useState(false); 
  
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
    const emailValidator = (email: string): string => {
      const re = /\S+@\S+\.\S+/;
      if (!email) return i18n.t(LocalizationKey.LOGIN_EMAIL_EMPTY);
      // if (!re.test(email)) return 'Địa chỉ email chưa hợp lệ.';
      return '';
    };
  
    const passwordValidator = (password: string): string => {
      if (password.length < 5) return i18n.t(LocalizationKey.LOGIN_PASSWORD_EMPTY);
      // if (!password) return "Mật khẩu không được để trống.";
      return '';
    };
  
    const handleEmailChange = (email: string) => {
      setEmail({ value: email, error: '' }); 
    };

    const handleCurrentPasswordChange = (password: string) => {
      setCurrentPassword({ value: password, error: '' }); 
    };
  
    const handleNewPasswordChange = (password: string) => {
      setNewPassword({ value: password, error: '' });
    };
  
    const handleConfirmNewPasswordChange = (confirmPassword: string) => {
      setConfirmNewPassword({ value: confirmPassword, error: '' }); 
    };
  
    const onChangePasswordPressed = async () => {
      setSubmitted(true); 
  
      const emailError = emailValidator(email.value);
      const currentPasswordError = passwordValidator(currentPassword.value);
      const newPasswordError = passwordValidator(newPassword.value);
      const confirmNewPasswordError = confirmNewPassword.value !== newPassword.value ? i18n.t(LocalizationKey.PASSWORD_MISMATCH) : '';
  
     
      setEmail({ ...email, error: emailError });
      setCurrentPassword({ ...currentPassword, error: currentPasswordError });
      setNewPassword({ ...newPassword, error: newPasswordError });
      setConfirmNewPassword({ ...confirmNewPassword, error: confirmNewPasswordError });
  
      if (!emailError && !currentPasswordError && !newPasswordError && !confirmNewPasswordError) {
        try {
          const response = await axios.patch('https://be-mobile-n3.onrender.com/Users/password', {
            email: email.value,
            oldpassword: currentPassword.value,
            password: newPassword.value,
          });
          Alert.alert(i18n.t(LocalizationKey.SUCCESS),i18n.t(LocalizationKey.PASSWORD_CHANGE_SUCCESS))
          navigation.navigate(RootScreens.MAIN);
        } catch (error) {
          console.error(error);
          setNewPassword({ ...newPassword, error: i18n.t(LocalizationKey.LOGIN_TRY_AGAIN) });
        }
      }
    };
  
    const handlePressOutside = () => {
      Keyboard.dismiss();
    };
  
    return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
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
                  style={[styles.input, email.error ? styles.inputError : null]}
                  contentStyle={styles.content}
                  activeUnderlineColor='gray'
                />
                {email.error ? <Text style={styles.errorText}>{email.error}</Text> : null}
                <TextInput
                  placeholder={i18n.t(LocalizationKey.CURRENT_PASSWORD)}
                  returnKeyType="next"
                  value={currentPassword.value}
                  onChangeText={handleCurrentPasswordChange}
                  autoCapitalize="none"
                  autoComplete="password"
                  secureTextEntry
                  style={[styles.input, currentPassword.error ? styles.inputError : null]}
                  contentStyle={styles.content}
                  activeUnderlineColor='gray'
                />
                {currentPassword.error ? <Text style={styles.errorText}>{currentPassword.error}</Text> : null}
                <TextInput
                  placeholder={i18n.t(LocalizationKey.NEW_PASSWORD)}
                  returnKeyType="next"
                  value={newPassword.value}
                  onChangeText={handleNewPasswordChange}
                  autoCapitalize="none"
                  autoComplete="password"
                  secureTextEntry
                  style={[styles.input, newPassword.error ? styles.inputError : null]}
                  contentStyle={styles.content}
                  activeUnderlineColor='gray'
                />
                {newPassword.error ? <Text style={styles.errorText}>{newPassword.error}</Text> : null}
                <TextInput
                  placeholder={i18n.t(LocalizationKey.CONFIRM_NEW_PASSWORD)}
                  returnKeyType="done"
                  value={confirmNewPassword.value}
                  onChangeText={handleConfirmNewPasswordChange}
                  autoCapitalize="none"
                  autoComplete="password"
                  secureTextEntry
                  style={[styles.input, confirmNewPassword.error ? styles.inputError : null]}
                  contentStyle={styles.content}
                  activeUnderlineColor='gray'
                />
                {confirmNewPassword.error ? <Text style={styles.errorText}>{confirmNewPassword.error}</Text> : null}
               
                <TouchableOpacity style={styles.changePassword} onPress={onChangePasswordPressed}>
                  <Button
                    mode="contained"
                    labelStyle={styles.content}
                    style={styles.button}
                    buttonColor={Colors.SUFACE_TINT_COLOR}
                  >
                   {i18n.t(LocalizationKey.LOGIN_FORGOT_PASSWORD)}
                  </Button>
                </TouchableOpacity>
        
                <View style={styles.row}>
                  <Text>{i18n.t(LocalizationKey.WANT_TO_GO_BACK)}</Text>
                  <TouchableOpacity
                   onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.link}>{i18n.t(LocalizationKey.GO_BACK)}</Text>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 24,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
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
    width: '80%',
    padding: 6,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom:40,
  },
  link: {
    fontWeight: 'bold',
  },
  changePassword: {
    marginTop: 60,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: '#bbbbbb',
  },
});