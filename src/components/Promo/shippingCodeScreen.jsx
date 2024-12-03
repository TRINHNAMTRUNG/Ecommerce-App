import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ShippingCodeScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mã Vận Chuyển</Text>
                <Text style={styles.headerSubtitle}>Áp dụng tối đa: 1</Text>
            </View>

            {/* Voucher 1 */}
            <View style={styles.voucher}>
                <Image
                    source={{ uri: 'https://storage.googleapis.com/a1aa/image/dPd8NtWdrx5YF9fE9ieenWiBl1SU0QDaPa4fV5PbLUjkqeSdC.jpg' }}
                    style={styles.voucherImage}
                />
                <View style={styles.voucherContent}>
                    <Text style={styles.voucherTitle}>Bách Hóa Online</Text>
                    <Text style={styles.voucherDiscount}>Giảm 50K</Text>
                    <Text style={styles.voucherQuantity}>Số lượng có hạn</Text>
                    <Text style={styles.expiry}>HSD: 31/10/24</Text>
                </View>
                <TouchableOpacity style={styles.info}>
                    <FontAwesomeIcon icon={faInfoCircle} size={20} color="#00aaff" />
                </TouchableOpacity>
                <Text style={styles.stamp}>CHƯA THOẢ ĐIỀU KIỆN</Text>
            </View>

            {/* Voucher 2 */}
            <View style={styles.voucher}>
                <Image
                    source={{ uri: 'https://storage.googleapis.com/a1aa/image/dPd8NtWdrx5YF9fE9ieenWiBl1SU0QDaPa4fV5PbLUjkqeSdC.jpg' }} // Thay đổi hình ảnh nếu cần
                    style={styles.voucherImage}
                />
                <View style={styles.voucherContent}>
                    <Text style={styles.voucherTitle}>Giao Hàng Nhanh</Text>
                    <Text style={styles.voucherDiscount}>Giảm 30K</Text>
                    <Text style={styles.voucherQuantity}>Số lượng có hạn</Text>
                    <Text style={styles.expiry}>HSD: 15/11/24</Text>
                </View>
                <TouchableOpacity style={styles.info}>
                    <FontAwesomeIcon icon={faInfoCircle} size={20} color="#00aaff" />
                </TouchableOpacity>
                <Text style={styles.stamp}>CHƯA THOẢ ĐIỀU KIỆN</Text>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerLink}>Xem thêm (41)</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBlockColor: 'f5f5f5',
        borderBlockStyle: 'solid',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 16,
        margin: 0,
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#888',
    },
    voucher: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f9ff',
        borderRadius: 10,
        padding: 10,
        position: 'relative',
        marginBottom: 10, // Thêm khoảng cách giữa các voucher
        shadowColor: '#000', // Màu bóng cho iOS
        shadowOffset: { width: 0, height: 1 }, // Kích thước bóng cho iOS
        shadowOpacity: 0.2, // Độ mờ bóng cho iOS
        shadowRadius: 1, // Bán kính bóng cho iOS
        elevation: 2, // Độ cao bóng cho Android
    },
    voucherImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    voucherContent: {
        flexGrow: 1,
    },
    voucherTitle: {
        fontSize: 14,
        color: '#00aaff',
        margin: 0,
    },
    voucherDiscount: {
        fontSize: 12,
        color: '#888',
        margin: 5,
    },
    voucherQuantity: {
        fontSize: 12,
        color: '#888',
    },
    expiry: {
        fontSize: 12,
        color: '#888',
    },
    stamp: {
        position: 'absolute',
        right: 10,
        bottom: 15,
        fontSize: 12,
        color: '#888',
        borderColor: '#888',
        borderWidth: 1,
        padding: 2,
        borderRadius: 5,
        transform: [{ rotate: '-8deg' }],
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerButton: {
        // Có thể thêm kiểu dáng cho nút footer nếu cần
    },
    footerLink: {
        fontSize: 14,
        color: '#007bff',
    },
    info: {
        position: 'absolute',
        top: 10,
        right: 10,
        fontSize: 14,
        color: '#888',
    },
});

export default ShippingCodeScreen;
