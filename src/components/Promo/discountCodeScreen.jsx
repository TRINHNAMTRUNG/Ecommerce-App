import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const DiscountCodeScreen = () => {
    const coupons = [
        {
            id: 1,
            title: "Giảm 10K",
            description: "Cho đơn hàng từ 149K",
            expiryDate: "27/10/24",
            image: 'https://storage.googleapis.com/a1aa/image/8HtnHYyuZD5MKpJ4FXEveOooK2oSjqv4doF2OIEbKpzZWL1JA.jpg',
            status: "Chưa thỏa điều kiện",
        },
        {
            id: 2,
            title: "Giảm 25K",
            description: "Cho đơn hàng từ 249K",
            expiryDate: "27/10/24",
            image: 'https://storage.googleapis.com/a1aa/image/8HtnHYyuZD5MKpJ4FXEveOooK2oSjqv4doF2OIEbKpzZWL1JA.jpg',
            status: "Chưa thỏa điều kiện",
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mã Giảm Giá</Text>
                <Text style={styles.headerSubtitle}>Áp dụng tối đa: 1</Text>
            </View>
            {coupons.map(coupon => (
                <View key={coupon.id} style={styles.coupon}>
                    <Image source={{ uri: coupon.image }} style={styles.couponImage} />
                    <View style={styles.details}>
                        <Text style={styles.couponTitle}>{coupon.title}</Text>
                        <Text style={styles.couponDescription}>{coupon.description}</Text>
                        <Text style={styles.expiryDate}>HSD: {coupon.expiryDate}</Text>
                    </View>
                    <TouchableOpacity style={styles.info}>
                        <FontAwesomeIcon icon={faInfoCircle} size={20} color="#00aaff" />
                    </TouchableOpacity>
                    <View style={styles.status}>
                        <Text style={styles.statusText}>{coupon.status}</Text>
                    </View>
                </View>
            ))}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerLink}>
                        Xem thêm (41)
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        margin: 0,
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#888',
    },
    coupon: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',  // Đổi màu nền thành trắng
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',  // Màu của bóng
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25, // Độ mờ của bóng
        shadowRadius: 4, // Đường kính bóng
        elevation: 5, // Chỉ dành cho Android
    },
    couponImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    details: {
        flexGrow: 1,
    },
    couponTitle: {
        fontSize: 16,
        margin: 0,
    },
    couponDescription: {
        fontSize: 12,
        color: '#888',
        margin: 5,
    },
    expiryDate: {
        fontSize: 12,
        color: '#888',
    },
    info: {
        position: 'absolute',
        top: 10,
        right: 10,
        fontSize: 14,
        color: '#888',
    },
    status: {
        position: 'absolute',
        right: 6,
        bottom: 7,
        fontSize: 10,
        color: '#888',
        borderColor: '#888',
        borderWidth: 1,
        padding: 1,
        borderRadius: 5,
  
    },
    statusText: {
        color: '#888',
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 10,
    },
    footerButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerLink: {
        fontSize: 14,
        color: '#007bff',
    },
});

export default DiscountCodeScreen;
