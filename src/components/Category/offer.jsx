import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBox, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const OfferComponent = () => {
    return (
        <View style={styles.container}>
            <FontAwesomeIcon icon={faBox} size={24} color="#1E88E5" style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    <Text style={styles.highlightText}>30 NGÀY</Text> đổi ý & miễn phí trả hàng
                </Text>
            </View>
            <FontAwesomeIcon icon={faChevronRight} size={16} color="#000" style={styles.arrow} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFE880',
        paddingVertical: 6,
        paddingHorizontal: 15,
        width: '90%',
        borderRadius: 5
    },
    icon: {
        marginLeft: 20
    },
    textContainer: {
        flex: 1,
    },
    text: {
        fontSize: 14,
        color: '#000',
        fontWeight: "500",
        textAlign: "center"
    },
    highlightText: {
        color: '#1E88E5',
        fontWeight: 'bold',
    },
    arrow: {
        marginLeft: 'auto',
    },
});

export default OfferComponent;
