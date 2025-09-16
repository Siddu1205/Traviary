import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import StackNavigator from './src/navigation/StackNavigator';
import { TripProvider } from './src/components/TripContext';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';


function App() {
  // Google signin config
  GoogleSignin.configure({
    webClientId:
      '71457510769-fmad9j9gtefgn4qros8880916qp1bpfn.apps.googleusercontent.com',
  });

  // Ask user for notification permission
  
  return (
    <TripProvider>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </TripProvider>
  );
}

const styles = StyleSheet.create({
});

export default App;
