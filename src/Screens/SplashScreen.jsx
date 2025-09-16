import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 4000); // fadeInLeft duration + small delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={["#1E3C72", "#2A5298"]} style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        duration={1200}
        style={styles.logoContainer}
      >
        <Image
          source={require("../images/logo1.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animatable.View>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: wp("100%"),
    height: hp("50%"),
  },
});
