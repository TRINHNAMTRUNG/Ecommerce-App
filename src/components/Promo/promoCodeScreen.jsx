import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PromoCodeScreen = () => {
    const [promoCode, setPromoCode] = useState('');

    const applyPromoCode = () => {
        // Thêm logic để xử lý mã khuyến mãi ở đây
        alert(`Mã khuyến mãi "${promoCode}" đã được áp dụng!`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mã khuyến mãi"
                    placeholderTextColor="#b0b0b0"
                    value={promoCode}
                    onChangeText={setPromoCode} // Cập nhật giá trị mã khuyến mãi
                />
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: promoCode ? '#f5f5f5' : '#e0e0e0' }]} 
                    disabled={!promoCode} // Vô hiệu hóa nút nếu không có mã khuyến mãi
                    onPress={applyPromoCode} // Gọi hàm khi nhấn nút
                >
                    <Text style={styles.buttonText}>Áp dụng</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.message}>
                <Text style={styles.messageText}>
                    Chọn sản phẩm trong giỏ trước khi chọn áp dụng mã khuyến mãi nhé!
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
   
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    input: {
        flex: 1,
        padding: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderRadius: 4,
        borderRightWidth: 1,
        fontSize: 14,
        color: '#000', // Thay đổi màu chữ cho rõ hơn
    },
    button: {
        padding: 14,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
    },
    buttonText: {
        fontSize: 14,
        color: '#000', // Thay đổi màu chữ cho rõ hơn
    },
    message: {
        padding: 10,
        backgroundColor: '#fff7e6',
        borderWidth: 1,
        borderColor: '#ffe0b3',
        borderRadius: 4,
    },
    messageText: {
        color: '#ff9900',
        fontSize: 16,
    },
});

export default PromoCodeScreen;
