import React, { memo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import PromoHeader from '../../components/Promo/promoHeader';
import PromoCodeScreen from '../../components/Promo/promoCodeScreen';
import DiscountCodeScreen from '../../components/Promo/discountCodeScreen';
import ShippingCodeScreen from '../../components/Promo/shippingCodeScreen';
import PromoFooter from '../../components/Promo/promoFooter';

const PromoPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <PromoHeader navigation={navigation} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <PromoCodeScreen />
                <DiscountCodeScreen />
                <ShippingCodeScreen />

            </ScrollView>
            <PromoFooter />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1, // Đảm bảo ScrollView có thể cuộn
        paddingBottom: 20, // Thêm khoảng trống ở dưới cùng nếu cần
    },
});

export default memo(PromoPage);
