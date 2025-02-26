import { StyleSheet} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import SearchScreen from '../screens/SearchScreen';
import WishListScreen from '../screens/WishListScreen';
import AccountScreen from '../screens/AccountScreen';
import { useTheme } from '@rneui/themed';

const TabArr = [
  { route: 'Home', label: 'Home', type: 'home', component: HomeScreen },
  { route: 'Booking', label: 'Booking', type: 'checkcircle', component: BookingScreen },
  { route: 'Search', label: 'Search', type: 'search1', component: SearchScreen },
  { route: 'WishList', label: 'Wishlist', type: 'hearto', component: WishListScreen },
  { route: 'Account', label: 'Account', type: 'user', component: AccountScreen },
];

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const {theme} = useTheme();

  return (
    <Tab.Navigator screenOptions={{
        headerShown:false
    }}>
      {TabArr.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.route}
          component={tab.component} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name={tab.type} size={20} color={color} />
            ),
            tabBarActiveTintColor : theme.colors.violet,
            headerBackground:'white',
            tabBarInactiveTintColor:theme.colors.black,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({});
