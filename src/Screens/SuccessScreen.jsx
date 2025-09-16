import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import LottieView from "lottie-react-native";

const SuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Lottie Success Animation */}
      <LottieView
        source={require("../Animations/success.json")}
        autoPlay
        loop={false}
        style={styles.lottie}
      />

      {/* Title */}
      <Text style={styles.title}>Awesome!</Text>
      <Text style={styles.subtitle}>Your booking has been confirmed.</Text>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Tab")} // redirect to home or booking start
      >
        <Text style={styles.buttonText}>Book a New Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: wp("5%"),
  },
  lottie: {
    width: wp("50%"),   // responsive width
    height: wp("50%"),  // keep square ratio
    marginBottom: hp("3%"),
  },
  title: {
    fontSize: wp("6%"),
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: hp("1%"),
  },
  subtitle: {
    fontSize: wp("4%"),
    color: "gray",
    marginBottom: hp("4%"),
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563EB",
    borderRadius: wp("2%"),
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("8%"),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: wp("4%"),
    fontWeight: "600",
  },
});
