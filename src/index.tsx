import React from "react";
import * as Localization from "expo-localization";
import { i18n, Language } from "@/Localization";
import { NativeBaseProvider } from "native-base";
import { store, persistor } from "@/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApplicationNavigator } from "./Navigation";
import { PaperProvider } from "react-native-paper";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://83fec534abaf0714e57be552097873a7@o4507197215801344.ingest.us.sentry.io/4507197221896192',
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  environment: 'development'
});


i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = Language.ENGLISH;

function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <ApplicationNavigator />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}

export default Sentry.wrap(App);