import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import StepIndicator from "../components/StepIndicator";
import { TripContext } from "../components/TripContext";

const TravelAssistanceScreen = ({ navigation }) => {
  const { trip, setTrip } = useContext(TripContext);

  const [enabled, setEnabled] = useState(
    trip.assistance && trip.assistance !== "Not Required"
  );

  const [selectedOption, setSelectedOption] = useState(
    trip.assistance && trip.assistance !== "Not Required"
      ? trip.assistance
      : "Car"
  );

  const goNext = () => {
    setTrip({
      ...trip,
      assistance: enabled ? selectedOption : "Not Required",
    });
    navigation.navigate("Confirmation");
  };

  return (
    <View style={styles.container}>
      <StepIndicator currentStep={3} />
      <Text style={styles.title}>Travel Assistance</Text>
      <Text style={styles.subtitle}>Select your Travel Assistance.</Text>

      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => setEnabled((v) => !v)}
      >
        <View style={[styles.checkbox, enabled && styles.checkboxChecked]} />
        <Text style={styles.checkboxLabel}>Travel Assistance</Text>
      </TouchableOpacity>

      {enabled && (
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Travel Assistance</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedOption}
              onValueChange={(itemValue) => setSelectedOption(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Flight" value="Flight" />
              <Picker.Item label="Bus" value="Bus" />
              <Picker.Item label="Car" value="Car" />
              <Picker.Item label="Train" value="Train" />
            </Picker>
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.prevBtn}
          onPress={() => navigation?.goBack()}
        >
          <Text style={styles.footerText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={goNext}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require("../images/Trees.png")}
        style={styles.bottomImage}
        pointerEvents="none"
      />
    </View>
  );
};

export default TravelAssistanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
  },
  title: {
    fontSize: wp("6%"),
    fontWeight: "700",
    marginBottom: hp("0.5%"),
  },
  subtitle: {
    fontSize: wp("4%"),
    color: "gray",
    marginBottom: hp("2%"),
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  checkbox: {
    width: wp("5%"),
    height: wp("5%"),
    borderWidth: 2,
    borderColor: "#007bff",
    borderRadius: 4,
    marginRight: wp("2%"),
  },
  checkboxChecked: {
    backgroundColor: "#007bff",
  },
  checkboxLabel: {
    fontSize: wp("4.5%"),
    fontWeight: "500",
  },
  dropdownContainer: {
    marginBottom: hp("3%"),
  },
  dropdownLabel: {
    fontSize: wp("4%"),
    fontWeight: "600",
    marginBottom: hp("1%"),
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  picker: {
    height: hp("6%"),
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: hp("4%"),
  },
  prevBtn: {
    backgroundColor: "#DBEAFE",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("6%"),
    borderRadius: wp("2%"),
    marginRight: wp("3%"),
  },
  nextBtn: {
    backgroundColor: "#007bff",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("6%"),
    borderRadius: wp("2%"),
  },
  footerText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: wp("4%"),
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: wp("4%"),
  },
  bottomImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: hp("35%"),
    width: wp("100%"),
    marginBottom: hp("1.5%"),
  },
});
