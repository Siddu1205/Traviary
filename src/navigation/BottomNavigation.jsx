import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import HomeScreen from '../Screens/HomeScreen';
import TripDetailsScreen from '../Screens/TripDetailsScreen';
import LogOutScreen from '../Screens/LogOutScreen';
import ExploreScreen from '../Screens/ExploreScreen';
const Tab = createBottomTabNavigator();
const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1e90ff',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Trip"
        component={TripDetailsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="suitcase-rolling" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LogOut"
        component={LogOutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="logout" size={size} color={color} />
          ),
        }}
        />
        <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="logout" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
