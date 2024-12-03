import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingComponent = ({ message = "Đang tải dữ liệu...", size = "large", color = "#007bff" }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9', // Nền sáng cho loading
    },
    message: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
});

export default LoadingComponent;
