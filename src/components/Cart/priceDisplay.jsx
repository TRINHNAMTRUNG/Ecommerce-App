import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
};
const PriceDisplay = ({ subtotal, discount, navigation }) => {
    const total = subtotal + discount; // Tính tổng tiền

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text>Tổng tiền hàng</Text>
                <Text>{formatCurrency(subtotal)}₫</Text>
            </View>
            <View style={styles.rowDeal}>
                <Text>Giảm giá từ Deal</Text>
                <Text style={styles.discount}>-{Math.abs(discount)}₫</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.bold}>Tổng tiền thanh toán</Text>
                <Text style={styles.bold}>{formatCurrency(total)}₫</Text>
            </View>
            <View style={styles.row}>
                <Text >Tiết kiệm</Text>
                <Text style={styles.discount}>{Math.abs(discount)}₫</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#ddd',
        marginTop: 20,
        backgroundColor: 'white',
        padding: 12,
        width: '100%',
        borderWidth: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    rowDeal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
        paddingBottom: 6,
    },
    bold: {
        fontWeight: 'bold',
    },
    discount: {
        color: 'green',
    },
});

export default PriceDisplay;
