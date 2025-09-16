import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import UserDetailsScreen from './src/Screens/UserDetailsScreen';
import UserDetailsScreen from '../Screens/UserDetailsScreen';
import DateSelectionScreen from '../Screens/DateSelection';
import SuccessScreen from '../Screens/SuccessScreen';
import ConfirmationScreen from '../Screens/ConfirmationScreen';
import GuestSelector from '../Screens/GuestScreen';
import TravelAssistanceScreen from '../Screens/TravelAssistanceScreen';
import SplashScreen from '../Screens/SplashScreen';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import MyTabs from './BottomNavigation';
import PlaceDetailsScreen from '../Screens/PlaceDetailsScreen'
import ExploreScreen from '../Screens/ExploreScreen';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DateSelection"
        component={DateSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Guests"
        component={GuestSelector}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Confirmation"
        component={ConfirmationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TravelAssistance"
        component={TravelAssistanceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tab"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlaceDetails"
        component={PlaceDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
};

export default StackNavigator;
