import { Image, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { CustomText } from '../components/Custom'
import { useTheme } from '@rneui/themed'
import { FONTS, IMAGES } from '../utils/constant'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();

    return (
        <View className='flex-1 p-5'>
            <View className=' mt-5'>
                <CustomText className='text-center text-xl'>H A P P E N I N G</CustomText>
                <CustomText className='text-center mt-20 text-base'>Login now find whats {'\n'}happening around you</CustomText>
                <TextInput
                    className='border border-gray-300 p-4 rounded-full mt-10 text-center'
                    placeholder='Enter email or mobile number'
                    placeholderTextColor={theme.colors.grey4}
                    style={{
                        fontFamily: FONTS.montserratMedium
                    }}
                />
                <TextInput
                    className='border border-gray-300 p-4 rounded-full mt-8 text-center'
                    placeholder='Click on send OTP'
                    placeholderTextColor={theme.colors.grey4}
                    style={{
                        fontFamily: FONTS.montserratMedium
                    }}
                />
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} className='bg-teal-500 p-3 rounded-full mt-5 items-center'>
                    <CustomText className='text-white'>Login</CustomText>
                </TouchableOpacity>
                <CustomText className='mt-5 text-right text-green-800'>Send OTP</CustomText>
                <CustomText className='text-gray-400 text-base text-center mt-10'>or</CustomText>
                <CustomText className='text-center text-gray-500 mt-8 mb-8'>Sign in with other accounts</CustomText>
                <View className='mt-10 items-center flex-row justify-center gap-4'>
                    <TouchableOpacity>
                        <Image
                            source={IMAGES.instagram}
                            className='h-9 w-9 rounded-full'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={IMAGES.facebook}
                            className='h-9 w-9 rounded-full'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={IMAGES.twitter}
                            className='h-9 w-9 rounded-full'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})