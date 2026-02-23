import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import DatePicker from "react-native-date-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import StepIndicator from "../components/StepIndicator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TripContext } from "../components/TripContext";

/* ---------- helpers ---------- */
const parseDate = (str) => {
  console.log("02/11/2024")
  if (!str) return null;
  const [dd, mm, yyyy] = str.split("/");
  const d = new Date(`${yyyy}-${mm}-${dd}`);
  return isNaN(d) ? null : d;
};

const formatDate = (d) => {
  if (!d) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

/* ---------- component ---------- */
const DateSelectionScreen = ({ navigation }) => {
  const { trip, setTrip } = useContext(TripContext);

  const [startDate, setStartDate] = useState(parseDate(trip.startDate) || new Date());
  const [endDate, setEndDate] = useState(parseDate(trip.endDate) || new Date());

  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  const isValid = trip.startDate && trip.endDate && parseDate(trip.endDate) >= parseDate(trip.startDate);

  /* handle start date */
  const handleStartConfirm = (date) => {
    setOpenStart(false);
    if (!date) return;

    const formatted = formatDate(date);
    setStartDate(date);

    // if endDate < startDate, reset endDate too
    if (endDate < date) {
      setEndDate(date);
      setTrip({ ...trip, startDate: formatted, endDate: formatted });
    } else {
      setTrip({ ...trip, startDate: formatted });
    }
  };

  /* handle end date */
  const handleEndConfirm = (date) => {
    setOpenEnd(false);
    if (!date) return;

    if (date < startDate) {
      Alert.alert("Invalid date", "End date cannot be before start date.");
      return;
    }

    setEndDate(date);
    setTrip({ ...trip, endDate: formatDate(date) });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StepIndicator currentStep={1} />

      <Text style={styles.title}>Date Selection</Text>
      <Text style={styles.sub}>Select your Start and End Date.</Text>

      {/* start date */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Start Date</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={trip.startDate}
            placeholder="dd/mm/yyyy"
            editable={false}
          />
          <TouchableOpacity style={styles.iconInside} onPress={() => setOpenStart(true)}>
            <Ionicons name="calendar-outline" size={22} color="#334155" />
          </TouchableOpacity>
        </View>
      </View>

      {/* end date */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>End Date</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={trip.endDate}
            placeholder="dd/mm/yyyy"
            editable={false}
          />
          <TouchableOpacity
            style={styles.iconInside}
            onPress={() => {
              if (!trip.startDate) {
                Alert.alert("Select start date first");
                return;
              }
              setOpenEnd(true);
            }}
            disabled={!trip.startDate}
          >
            <Ionicons
              name="calendar-outline"
              size={22}
              color={trip.startDate ? "#334155" : "#B0BEC5"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* next button */}
      <TouchableOpacity
        style={[styles.button, !isValid && styles.buttonDisabled]}
        disabled={!isValid}
        onPress={() => navigation.navigate("Guests")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* pickers */}
      {openStart && (
        <DatePicker
          modal
          mode="date"
          open={openStart}
          date={startDate}
          onConfirm={handleStartConfirm}
          onCancel={() => setOpenStart(false)}
        />
      )}

      {openEnd && (
        <DatePicker
          modal
          mode="date"
          open={openEnd}
          date={endDate}
          minimumDate={startDate}
          onConfirm={handleEndConfirm}
          onCancel={() => setOpenEnd(false)}
        />
      )}

      {/* bottom image */}
      <Image
        source={require("../images/mountain.png")}
        style={styles.bottomImage}
        resizeMode="stretch"
      />
    </View>
  );
};

export default DateSelectionScreen;


/* ---------- styles ---------- */
const styles = StyleSheet.create({
  title: {
    fontSize: wp('6%'),
    fontWeight: '600',
    color: '#1E293B',
    padding: hp('2%'),
  },
  sub: {
    fontSize: wp('4%'),
    color: '#64748B',
    paddingHorizontal: wp('4%'),
    paddingBottom: hp('2%'),
  },
  inputContainer: {
    marginBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
  },
  label: {
    fontSize: hp('2%'),
    color: '#334155',
    fontWeight: '600',
    marginBottom: hp('0.8%'),
  },
  inputWrapper: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    height: hp('6%'),
    justifyContent: 'center',
    paddingRight: wp('3%'),
  },
  input: {
    paddingLeft: wp('3.5%'),
    paddingRight: wp('12%'),
    fontSize: hp('2%'),
    color: '#0F172A',
    height: '100%',
  },
  iconInside: {
    position: 'absolute',
    right: wp('3%'),
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('1%'),
  },
  iconDisabled: {
    opacity: 0.6,
  },
  button: {
    width: wp('23%'),
    backgroundColor: '#2563EB',
    paddingVertical: hp('1.2%'),
    borderRadius: 8,
    marginTop: hp('1%'),
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: wp('5%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: '500',
  },
  buttonDisabled: {
    backgroundColor: '#a6c9ff',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: hp('40%'),
    width: '100%',
    marginBottom: hp('2%'),
  },
});
