import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen'
import BottomTabNavigation from './BottomTabNavigation'
import SelectSeats from '../screens/SelectSeats'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FONTS } from '../utils/constant'

const Stack = createNativeStackNavigator()

const StackNavigation = () => {

    const navigation = useNavigation()

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
            />
            <Stack.Screen
                name='SplashScreen'
                component={SplashScreen}
                options={{
                }}
            />
            <Stack.Screen
                name='HomeScreen'
                component={BottomTabNavigation}
            />
            <Stack.Screen
                name="SelectSeats"
                component={SelectSeats}
                options={{
                    headerShown: true,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginHorizontal: 10 }}>
                            <Ionicons name="chevron-back-outline" size={20} />
                        </TouchableOpacity>
                    ),
                    title: "Select Seats",
                    headerTitleStyle: {
                        fontFamily: FONTS.montserratMedium,
                        fontSize: 18,
                        color: "#333",
                    },
                    headerTitleAlign: "left",
                }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigation

const styles = StyleSheet.create({})