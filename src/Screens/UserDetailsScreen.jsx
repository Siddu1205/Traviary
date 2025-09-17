import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StepIndicator from '../components/StepIndicator';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TripContext } from '../components/TripContext'; 

const UserDetailsScreen = ({ navigation }) => {
  const { trip, setTrip } = useContext(TripContext);

  const isValid = trip.name && trip.startLocation && trip.endLocation;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StepIndicator currentStep={0} />

      <View style={styles.content}>
        <Text style={styles.title}>Your Details</Text>
        <Text style={styles.sub}>Enter your name and location details</Text>
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputContainer}>
          <Icon
            name="account-outline"
            size={22}
            color="#64748B"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Name"
            placeholderTextColor="#94A3B8"
            value={trip.name || ''}
            onChangeText={text => setTrip({ ...trip, name: text })}
          />
        </View>
        <Text style={styles.label}>Start Location</Text>
        <View style={styles.inputContainer}>
          <Icon
            name="map-marker-outline"
            size={22}
            color="#64748B"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Start Location"
            placeholderTextColor="#94A3B8"
            value={trip.startLocation || ''}
            onChangeText={text => setTrip({ ...trip, startLocation: text })}
          />
        </View>

        <Text style={styles.label}>End Location</Text>
        <View style={styles.inputContainer}>
          <Icon
            name="flag-checkered"
            size={22}
            color="#64748B"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter End Location"
            placeholderTextColor="#94A3B8"
            value={trip.endLocation || ''}
            onChangeText={text => setTrip({ ...trip, endLocation: text })}
          />
        </View>

        <TouchableOpacity
          disabled={!isValid}
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={() => {
            setTrip(prev => ({ ...prev, endLocation: trip.endLocation }));
            navigation.navigate('DateSelection');
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require('../images/water.png')}
        style={styles.bottomImage}
        resizeMode="stretch"
        pointerEvents="none"
      />
    </View>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  content: { flex: 1, paddingBottom: hp('15%') },
  title: {
    fontSize: wp('6%'),
    fontWeight: '600',
    color: '#0F172A',
    padding: hp('2%'),
  },
  sub: {
    fontSize: wp('4%'),
    color: '#64748B',
    paddingHorizontal: wp('4%'),
    paddingBottom: hp('2%'),
  },
  label: {
    fontSize: hp('2%'),
    marginBottom: hp('0.6%'),
    color: '#1E293B',
    fontWeight: '600',
    paddingHorizontal: wp('4%'),
    paddingTop: hp('1%'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('90%'),
    height: hp('6%'),
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginHorizontal: wp('3.5%'),
    borderRadius: 12,
    marginBottom: hp('1.8%'),
    backgroundColor: '#F8FAFC',
    paddingHorizontal: wp('2%'),
  },
  icon: { marginRight: wp('2%') },
  input: { flex: 1, fontSize: hp('2%'), color: '#0F172A' },
  button: {
    width: wp('30%'),
    backgroundColor: '#2563EB',
    paddingVertical: hp('1.5%'),
    borderRadius: 12,
    marginTop: hp('2%'),
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: wp('5%'),
    marginBottom: hp('2%'),
    shadowColor: '#2563EB',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: { backgroundColor: '#93C5FD' },
  buttonText: { color: '#fff', fontSize: hp('2%'), fontWeight: '600' },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: hp('35%'),
    width: '100%',
    marginBottom: hp('0.5%'),
    opacity: 0.8,
  },
});
