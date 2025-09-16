// src/screens/GuestSelector.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import StepIndicator from '../components/StepIndicator';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TripContext } from '../components/TripContext';

const GuestSelector = ({ navigation }) => {
  const { trip, setTrip } = useContext(TripContext);

  // counters update trip directly
  const increment = (field) => {
    setTrip((prev) => ({
      ...prev,
      guests: {
        ...prev.guests,
        [field]: prev.guests[field] + 1,
      },
    }));
  };

  const decrement = (field) => {
    setTrip((prev) => ({
      ...prev,
      guests: {
        ...prev.guests,
        [field]: prev.guests[field] > 0 ? prev.guests[field] - 1 : 0,
      },
    }));
  };

  return (
    <View style={styles.container}>
      <StepIndicator currentStep={2} />
      <Text style={styles.title}>Guests</Text>
      <Text style={styles.subtitle}>Select your Guests</Text>

      {/* Adults */}
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Adults</Text>
          <Text style={styles.subLabel}>Age 13 or above</Text>
        </View>
        <View style={styles.counter}>
          <TouchableOpacity style={styles.btn} onPress={() => decrement('adults')}>
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.value}>{trip.guests.adults}</Text>
          <TouchableOpacity style={styles.btn} onPress={() => increment('adults')}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Children */}
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Children</Text>
          <Text style={styles.subLabel}>Age 2–12</Text>
        </View>
        <View style={styles.counter}>
          <TouchableOpacity style={styles.btn} onPress={() => decrement('children')}>
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.value}>{trip.guests.children}</Text>
          <TouchableOpacity style={styles.btn} onPress={() => increment('children')}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Infants */}
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Infants</Text>
          <Text style={styles.subLabel}>Under 2</Text>
        </View>
        <View style={styles.counter}>
          <TouchableOpacity style={styles.btn} onPress={() => decrement('infants')}>
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.value}>{trip.guests.infants}</Text>
          <TouchableOpacity style={styles.btn} onPress={() => increment('infants')}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.prevBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.footerText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('TravelAssistance')}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Image */}
      <Image
        source={require('../images/beach.png')}
        style={styles.bottomImage}
        resizeMode="stretch"
        pointerEvents="none"
      />
    </View>
  );
};

export default GuestSelector;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: '700',
    marginBottom: hp('0.5%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: 'gray',
    marginBottom: hp('2%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  label: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
  subLabel: {
    fontSize: wp('3.5%'),
    color: 'gray',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: wp('5%'),
    fontWeight: '600',
  },
  value: {
    fontSize: wp('4.5%'),
    marginHorizontal: wp('3%'),
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: hp('4%'),
  },
  prevBtn: {
    backgroundColor: '#DBEAFE',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    borderRadius: wp('2%'),
    marginRight: wp('3%'),
  },
  nextBtn: {
    backgroundColor: '#007bff',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    borderRadius: wp('2%'),
  },
  footerText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: wp('4%'),
  },
  nextText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: wp('4%'),
  },
  bottomImage: {
    position: "absolute",
    bottom: 0, // 👈 moved to right
    height: hp("35%"),
    width: wp("100%"), // only half width, so it sits right side
    marginBottom: hp("2%"),
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});