import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faLocationDot, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Address = () => {

    return (
        <View style={styles.container}>

            <View style={styles.address}>
                <FontAwesomeIcon icon={faLocationDot} size={16} color="#00BFFF" />
                <Text style={styles.text}>Địa chỉ</Text>
                <FontAwesomeIcon icon={faChevronRight} size={16} color="black" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#fff',
        height: 'auto',
    },

    address: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,

        fontSize: 14,
        color: '#666',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    icon: {
        color: '#007bff',
        marginRight: 5,
    },
    text: {
        flexGrow: 1,
        paddingLeft: 10,
    },
    arrowIcon: {
        color: '#666',
    },
});

export default Address;
