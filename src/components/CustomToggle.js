import { useTheme } from "@rneui/themed";
import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";

const CustomToggle = ({ onToggle, initialState = false }) => {
    const [isOn, setIsOn] = useState(initialState);
    const animatedValue = useRef(new Animated.Value(initialState ? 1 : 0)).current;

    const { theme } = useTheme();

    const handleToggle = () => {
        const newValue = !isOn;
        setIsOn(newValue);

        animatedValue.stopAnimation();

        Animated.timing(animatedValue, {
            toValue: newValue ? 1 : 0,
            duration: 300,
            easing: (t) => t,
            useNativeDriver: false,
        }).start();

        onToggle && onToggle(newValue);
    };

    const toggleTranslate = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [3, 24],
    });

    return (
        <TouchableOpacity onPress={handleToggle} activeOpacity={1} delayPressIn={0}>
            <View style={[styles.toggleContainer, isOn && {
                backgroundColor: theme.colors.violet
            }]}>
                <Animated.View
                    style={[
                        styles.toggleCircle,
                        { transform: [{ translateX: toggleTranslate }] },
                    ]}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    toggleContainer: {
        width: 52,
        height: 28,
        borderRadius: 15,
        backgroundColor: "#ccc",
        justifyContent: "center",
        padding: 2,
    },
    toggleCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#fff",
        elevation: 3,
    },
});

export default CustomToggle;
