import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../images/home.png')} style={styles.image} />
      <Text style={styles.title}>Travel. Relax. Memories.</Text>
      <Text style={styles.subtitle}>
        With travel trip you can experience new travel and the best tourist
        destinations.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserDetails')}>
        <Text style={styles.buttonText}>Book a New Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: wp('6%'),
    paddingTop: hp('5%'),
  },
  image: {
    width: wp('80%'),
    height: hp('50%'),
    resizeMode: 'contain',
    marginBottom: hp('1%'),
  },
  title: {
    fontSize: wp('6.5%'),
    fontWeight: '700',
    color: '#304766',
    textAlign: 'center',
    marginBottom: hp('3.5%'),
  },
  subtitle: {
    fontSize: wp('3.8%'),
    color: '#555',
    textAlign: 'center',
    lineHeight: hp('2.5%'),
    marginBottom: hp('4%'),
  },
  button: {
    backgroundColor: '#304766',
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('8%'),
    borderRadius: wp('2%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4.2%'),
    fontWeight: '600',
  },
});
