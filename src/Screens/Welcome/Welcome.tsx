import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { RootScreens } from "..";
import Onboarding from "react-native-onboarding-swiper";
import { Colors } from "@/Theme";
import Lottie from "lottie-react-native";
import { setItem } from "utils/asyncStorage";
import { LocalizationKey, i18n } from "@/Localization";
export const Welcome = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const handleDone = () => {
    props.onNavigate(RootScreens.LOGIN);
    setItem('onboarding','1');
  };

  const handleSkip = () => {
    props.onNavigate(RootScreens.LOGIN); 
    setItem('onboarding','1');
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleSkip}
        bottomBarColor={Colors.SUFACE_TINT_COLOR}
        titleStyles={styles.title}
        subTitleStyles={styles.subTitle}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <Lottie
                source={require("../../../assets/animation/boarding1.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: i18n.t(LocalizationKey.ONBOARDING_TITLE_1),
            subtitle: i18n.t(LocalizationKey.ONBOARDING_SUBTITLE_1),
          },
          {
            backgroundColor: "#fff",
            image: (
              <Lottie
                source={require("../../../assets/animation/boarding2.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: i18n.t(LocalizationKey.ONBOARDING_TITLE_2),
            subtitle: i18n.t(LocalizationKey.ONBOARDING_SUBTITLE_2),
          },
          {
            backgroundColor: "#fff",
            image: (
              <Lottie
                source={require("../../../assets/animation/boarding3.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: i18n.t(LocalizationKey.ONBOARDING_TITLE_3),
            subtitle: i18n.t(LocalizationKey.ONBOARDING_SUBTITLE_3),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  lottie: {
    width: 400,
    height: 400,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#120068",
    textAlign: "center",
    marginRight: 20,
    marginLeft: 20,
  },
  subTitle: {
    marginRight: 50,
    marginLeft: 50,
    fontSize: 15,
    color: "#120068",
    textAlign: "center",
    margin: 30,
  },
});