import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { CustomText } from '../components/Custom'
import { CURRENCY_SYMBOL, FONTS } from '../utils/constant'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@rneui/themed'

const STAGES = [
    { title: "Platinum Class", amount: "1,480", id: 1, seatsLeft: 8 },
    { title: "Gold Class", amount: "800", id: 2, seatsLeft: 5 },
    { title: "Silver Class", amount: "480", id: 3, seatsLeft: 3 },
];

const SelectSeats = () => {
    const [selectedSeats, setSelectedSeats] = useState({});

    const { theme } = useTheme()

    const handleSeatChange = (id, change) => {
        setSelectedSeats(prev => {
            const updatedSeats = { ...prev };
            const newCount = (updatedSeats[id] || 0) + change;
            if (newCount >= 0) {
                updatedSeats[id] = newCount;
            }
            return { ...updatedSeats };
        });
    };

    return (
        <View className='flex-1 bg-white'>
            <View className='bg-gray-50 m-5 border border-gray-400 rounded-md mb-3'>
                <View className='items-center'>
                    <CustomText className=' bg-gray-200 p-1 px-10 rounded-md'>Stage</CustomText>
                </View>
                <FlatList
                    data={STAGES}
                    renderItem={({ item, index }) => {
                        return (
                            <View key={item.id} className={`p-3 my-1
                                ${index === 0 && `bg-violet-200`}
                                ${index === 1 && `py-4 bg-yellow-200`} 
                                ${index === 2 && `py-8 bg-slate-200 my-0`}
                                `}>
                                <CustomText className='text-center'>{item.title} {CURRENCY_SYMBOL} {item.amount}</CustomText>
                            </View>
                        )
                    }}
                    className='mt-8'
                />
            </View>
            <CustomText className='text-center text-slate-500'>Seats Layout</CustomText>

            <FlatList
                data={STAGES}
                keyExtractor={(item) => item.id.toString()}
                className='mt-5'
                renderItem={({ item, index }) => (
                    <View className="flex-row items-center justify-between py-3 border-b border-gray-300 px-5">
                        <Ionicons name='ticket' size={20} color={index === 0 ? theme.colors.grey4 : index === 1 ? theme.colors.secondary : theme.colors.grey3} />
                        <CustomText className="text-md">{item.title}</CustomText>
                        <CustomText className="text-md font-semibold text-gray-700">₹ {item.amount}</CustomText>
                        <CustomText className="text-orange-500">{item.seatsLeft} seats left</CustomText>

                        <View className="flex-row items-center">
                            <TouchableOpacity
                                onPress={() => handleSeatChange(item.id, -1)}
                                className={`px-3 py-1 rounded border ${selectedSeats[item.id] > 0 ? "border-purple-600 bg-purple-200" : "border-gray-300"
                                    }`}
                                disabled={selectedSeats[item.id] === 0}
                            >
                                <CustomText className={`text-md  ${selectedSeats[item.id] === 0 ? "text-gray-400" : "text-gray-900"}`}>
                                    -
                                </CustomText>
                            </TouchableOpacity>

                            <CustomText className="text-md  mx-3">{selectedSeats[item.id] || 0}</CustomText>

                            <TouchableOpacity
                                onPress={() => handleSeatChange(item.id, 1)}
                                className="px-3 py-1 rounded border border-purple-600 bg-purple-600"
                            >
                                <CustomText className="text-md  text-white">+</CustomText>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <View className='p-5 flex-row items-center border-t-gray-200 border-t'>
                <View>
                    <CustomText>
                        <CustomText style={{ fontFamily: FONTS.montserratBold }} className='text-lg text-violet-800'>{CURRENCY_SYMBOL}1,480 </CustomText>
                        for seat</CustomText>
                    <CustomText>+199 tax & fees</CustomText>
                </View>
                <TouchableOpacity className="justify-end  bg-violet-500 ml-auto  items-center p-2 rounded-full">
                    <CustomText className="text-white text-base px-4">Pay Now</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SelectSeats

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 16,
        flex: 1,
    },
    amount: {
        fontSize: 16,
        color: '#333',
    },
    seatsLeft: {
        color: '#f39c12',
        fontWeight: '600',
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        padding: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#8e44ad',
        marginHorizontal: 5,
    },
    activeButton: {
        backgroundColor: '#8e44ad',
    },
    disabledButton: {
        borderColor: '#ccc',
    },
    buttonText: {
        fontSize: 16,
        color: '#8e44ad',
    },
    disabledText: {
        color: '#ccc',
    },
    count: {
        fontSize: 16,
    },
})