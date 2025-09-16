// ConfirmationScreen.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StepIndicator from '../components/StepIndicator';
import { TripContext } from '../components/TripContext'; // ✅ correct path

const ConfirmationScreen = ({ navigation }) => {
  const { trip, addTrip } = useContext(TripContext);

  // ✅ trip data comes directly from context
  const {
    name,
    startLocation,
    endLocation,
    startDate,
    endDate,
    guests,
    assistance: travelAssistance,
  } = trip;

  // ✅ calculate total guests
  const totalGuests =
    (guests?.adults || 0) + (guests?.children || 0) + (guests?.infants || 0);

  const handleConfirm = () => {
    // store only essential trip data
    addTrip({ endLocation, startDate, endDate, assistance: travelAssistance });
    navigation.navigate('Success');
  };

  return (
    <View style={styles.container}>
      <StepIndicator currentStep={4} />

      <Text style={styles.title}>Confirmation</Text>
      <Text style={styles.subtitle}>Confirm your details</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Start Location</Text>
          <Text style={styles.value}>{startLocation}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>End Location</Text>
          <Text style={styles.value}>{endLocation}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Start Date</Text>
          <Text style={styles.value}>{startDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>End Date</Text>
          <Text style={styles.value}>{endDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Guests</Text>
          <Text style={styles.value}>{totalGuests}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Travel Assistance</Text>
          <Text style={styles.value}>{travelAssistance}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../images/confirm.png')}
        style={styles.bottomImage}
        pointerEvents="none"
      />
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: wp('5%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: '600',
    color: '#334155',
    marginBottom: hp('0.5%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: 'gray',
    marginBottom: hp('2%'),
  },
  detailsContainer: {
    marginBottom: hp('4%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1.5%'),
  },
  label: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
    color: '#111827',
  },
  value: {
    fontSize: wp('4%'),
    color: '#1E293B',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: wp('3%'),
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: wp('2%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    backgroundColor: '#fff',
  },
  cancelText: {
    fontSize: wp('4%'),
    color: '#2563EB',
  },
  confirmBtn: {
    backgroundColor: '#2563EB',
    borderRadius: wp('2%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
  },
  confirmText: {
    fontSize: wp('4%'),
    color: '#fff',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: hp('35%'),
    width: wp('100%'),
    marginBottom: hp('2%'),
  },
});
