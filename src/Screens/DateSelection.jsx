import React, { useContext, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StepIndicator from '../components/StepIndicator';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TripContext } from '../components/TripContext';


const parseDDMMYYYY = (s) => {
  if (!s || typeof s !== 'string') return null;
  const parts = s.split('/');
  if (parts.length !== 3) return null;
  const [dd, mm, yyyy] = parts;
  const iso = `${yyyy.padStart(4, '0')}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
};

const formatDateDDMMYYYY = (d) => {
  if (!d || !(d instanceof Date)) return '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const DateSelectionScreen = ({ navigation }) => {
  const { trip, setTrip } = useContext(TripContext);

  const startStr = trip?.startDate || '';
  const endStr = trip?.endDate || '';

  const [startDateObj, setStartDateObj] = useState(() => parseDDMMYYYY(startStr) || new Date());
  const [endDateObj, setEndDateObj] = useState(() => parseDDMMYYYY(endStr) || new Date());

  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  const bothSelected = !!startStr && !!endStr;
  const isValid =
    bothSelected &&
    (parseDDMMYYYY(endStr)?.getTime() ?? endDateObj.getTime()) >=
      (parseDDMMYYYY(startStr)?.getTime() ?? startDateObj.getTime());
  
  const onConfirmStart = useCallback(
    (selectedDate) => {
      setOpenStart(false);
      if (!selectedDate || !(selectedDate instanceof Date)) return;

      setStartDateObj(selectedDate);

      setTimeout(() => {
        const formattedStart = formatDateDDMMYYYY(selectedDate);
        const currentEnd = parseDDMMYYYY(endStr) || endDateObj;

        if (currentEnd.getTime() < selectedDate.getTime()) {
          setEndDateObj(selectedDate);
          setTrip({ ...trip, startDate: formattedStart, endDate: formattedStart });
        } else {
          setTrip({ ...trip, startDate: formattedStart });
        }
      }, 50);
    },
    [trip, endStr, endDateObj]
  );

  const onConfirmEnd = useCallback(
    (selectedDate) => {
      setOpenEnd(false);
      if (!selectedDate || !(selectedDate instanceof Date)) return;

      const startDate = parseDDMMYYYY(startStr) || startDateObj;
      if (selectedDate.getTime() < startDate.getTime()) {
        setTimeout(() => {
          Alert.alert('Invalid date', 'End date cannot be before start date.');
        }, 60);
        return;
      }

      setEndDateObj(selectedDate);

      setTimeout(() => {
        setTrip({ ...trip, endDate: formatDateDDMMYYYY(selectedDate) });
      }, 50);
    },
    [trip, startStr, startDateObj]
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StepIndicator currentStep={1} />

      <Text style={styles.title}>Date Selection</Text>
      <Text style={styles.sub}>Select your Start and End Date.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Start Date</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="dd/mm/yyyy"
            placeholderTextColor="#94A3B8"
            value={startStr}
            editable={false}
            accessibilityLabel="Start date"
          />
          <TouchableOpacity
            style={styles.iconInside}
            onPress={() => setOpenStart(true)}
            accessibilityLabel="Open start date picker"
            activeOpacity={0.7}
          >
            <Ionicons name="calendar-outline" size={22} color="#334155" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>End Date</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="dd/mm/yyyy"
            placeholderTextColor="#94A3B8"
            value={endStr}
            editable={false}
            accessibilityLabel="End date"
          />
          <TouchableOpacity
            style={[styles.iconInside, !startStr && styles.iconDisabled]}
            onPress={() => {
              if (!startStr) {
                Alert.alert('Select start date', 'Please select a start date first.');
                return;
              }
              setOpenEnd(true);
            }}
            disabled={!startStr}
            activeOpacity={0.7}
          >
            <Ionicons name="calendar-outline" size={22} color={!startStr ? '#B0BEC5' : '#334155'} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        disabled={!isValid}
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={() => navigation.navigate('Guests')}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {openStart && (
        <DatePicker
          modal
          mode="date"
          open={openStart}
          date={startDateObj}
          onConfirm={onConfirmStart}
          onCancel={() => setOpenStart(false)}
        />
      )}

      {openEnd && (
        <DatePicker
          modal
          mode="date"
          open={openEnd}
          date={endDateObj}
          minimumDate={startDateObj}
          onConfirm={onConfirmEnd}
          onCancel={() => setOpenEnd(false)}
        />
      )}

      <Image
        source={require('../images/mountain.png')}
        style={styles.bottomImage}
        resizeMode="stretch"
        pointerEvents="none"
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
