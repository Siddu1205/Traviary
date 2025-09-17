import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-picker/picker';


import { useTranslation } from '../components/useTranslation';

const LoginScreen = ({ navigation, route }) => {
  const { mode } = route.params || { mode: 'login' };

  const { t, language, setLanguage } = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadRemembered = async () => {
      try {
        const rem = await AsyncStorage.getItem('remembered');
        if (rem) {
          const obj = JSON.parse(rem);
          if (obj?.username) {
            setUsername(obj.username);
            setRememberMe(true);
          }
        }
      } catch (e) {
        console.log('loadRemembered error', e);
      }
    };
    loadRemembered();
  }, []);

  const LoginHandler = async () => {
    if (username.trim() === '' || password.trim() === '') {
      setError(t('dontHaveAccount'));
      return;
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.username === username && user.password === password) {
          
          try {
            if (rememberMe) {
              await AsyncStorage.setItem(
                'remembered',
                JSON.stringify({ username }),
              );
            } else {
              await AsyncStorage.removeItem('remembered');
            }
          } catch (e) {
            console.log('remember store error', e);
          }

          Alert.alert('✅', t('login') + ' successful!');
          navigation.navigate('Tab'); 
          setError('');
          setPassword('');
          if (!rememberMe) setUsername('');
        } else {
          setError('Incorrect username or password');
        }
      } else {
        setError('No user registered. Please sign up first.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const SignupHandler = async () => {
    if (!username || !email || !password) {
      setError('Please fill all fields');
      return;
    }
    const user = { username, email, password };
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert('✅', t('signup') + ' successful!');
      navigation.navigate('Login', { mode: 'login' });
    } catch (e) {
      console.log(e);
    }
  };

  const GoogleHandler = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const signInResult = await GoogleSignin.signIn();
    let idToken = signInResult.data?.idToken || signInResult.idToken;
    if (!idToken) throw new Error('No ID token found');
    const googleCredential = GoogleAuthProvider.credential(idToken);
    return signInWithCredential(getAuth(), googleCredential);
  };

  return (
    <LinearGradient colors={['#E0EAFC', '#CFDEF3']} style={styles.container}>
      {mode === 'login' && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={language}
            onValueChange={itemValue => setLanguage(itemValue)}
            style={styles.picker}
            mode="dropdown"
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="हिंदी" value="hi" />
            <Picker.Item label="Español" value="es" />
          </Picker>
        </View>
      )}

      <Animatable.View animation="fadeInUp" duration={70} style={styles.card}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require('../images/logo2.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Animatable.View animation="fadeInLeft" delay={300}>
          <Text style={styles.label}>{t('username')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('username')}
            placeholderTextColor="black"
            value={username}
            onChangeText={setUsername}
          />
        </Animatable.View>

        {mode === 'signup' && (
          <Animatable.View animation="fadeInLeft" delay={500}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="black"
              value={email}
              onChangeText={setEmail}
            />
          </Animatable.View>
        )}

        <Animatable.View
          animation="fadeInLeft"
          delay={700}
          style={{ position: 'relative' }}
        >
          <Text style={styles.label}>{t('password')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('password')}
            placeholderTextColor="black"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <FontAwesome
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="fadeIn" delay={850}>
          <TouchableOpacity
            style={styles.rememberRow}
            activeOpacity={0.8}
            onPress={() => setRememberMe(prev => !prev)}
          >
            <View
              style={[
                styles.checkbox,
                rememberMe ? styles.checkboxChecked : null,
              ]}
            >
              {rememberMe && (
                <FontAwesome name="check" size={14} color="#fff" />
              )}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>
        </Animatable.View>

        {error ? (
          <Animatable.Text animation="fadeIn" style={styles.error}>
            {error}
          </Animatable.Text>
        ) : null}

        <Animatable.View animation="fadeInUp" delay={900}>
          <TouchableOpacity
            style={styles.button}
            onPress={mode === 'login' ? LoginHandler : SignupHandler}
          >
            <Text style={styles.buttonText}>
              {mode === 'login' ? t('login') : t('signup')}
            </Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View
          animation="fadeIn"
          delay={1100}
          style={{ flexDirection: 'row', justifyContent: 'center' }}
        >
          {mode === 'login' ? (
            <>
              <Text style={styles.signup}>{t('dontHaveAccount')} </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login', { mode: 'signup' })}
              >
                <Text style={styles.span}>{t('signup')}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.signup}>{t('alreadyHaveAccount')} </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login', { mode: 'login' })}
              >
                <Text style={styles.span}>{t('login')}</Text>
              </TouchableOpacity>
            </>
          )}
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={1300}>
          <TouchableOpacity style={styles.googleBtn} onPress={GoogleHandler}>
            <AntDesign name="google" size={24} color="#DB4437" />
            <Text style={styles.googleText}>{t('continueWithGoogle')}</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  pickerContainer: {
    position: 'absolute',
    top: hp('5%'),
    right: wp('5%'),
    width: wp('32%'),
    height: hp('6%'),
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  picker: { width: '100%', height: '100%' },
  logo: {
    width: wp('100%'),
    height: hp('12%'),
    alignSelf: 'center',
    marginBottom: hp('4%'),
  },
  card: {
    width: wp('88%'),
    paddingVertical: hp('9%'),
    paddingHorizontal: wp('9%'),
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  label: {
    fontSize: hp('2%'),
    marginBottom: hp('1%'),
    color: '#334155',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: hp('5%'),
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: wp('3.5%'),
    marginBottom: hp('2.2%'),
    backgroundColor: '#F8FAFC',
    fontSize: hp('2%'),
    color: '#0F172A',
  },
  eyeIcon: { position: 'absolute', right: 10, top: hp('4.9%') },
  error: {
    color: '#DC2626',
    marginBottom: hp('1%'),
    fontWeight: '500',
    textAlign: 'center',
    fontSize: hp('1.8%'),
  },
  button: {
    backgroundColor: '#304766',
    paddingVertical: hp('2%'),
    borderRadius: 10,
    marginTop: hp('1%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: hp('2.1%'),
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  signup: {
    textAlign: 'center',
    color: '#666',
    marginTop: hp('2%'),
    fontSize: hp('1.8%'),
  },
  span: {
    color: '#1E90FF',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
    marginTop: hp('2%'),
    textAlign: 'center',
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: hp('1.8%'),
    borderRadius: 10,
    marginTop: hp('2.5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  googleText: {
    marginLeft: 10,
    fontSize: hp('2%'),
    color: '#374151',
    fontWeight: '600',
  },

  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#304766',
    borderColor: '#304766',
  },
  rememberText: {
    color: '#334155',
    fontSize: hp('1.9%'),
  },
});
