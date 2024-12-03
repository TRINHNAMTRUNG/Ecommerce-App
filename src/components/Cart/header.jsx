import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Header = ({ navigation }) => {
    const handleClose = () => {
        navigation.goBack();
        console.log('Đóng giỏ hàng');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleClose}>
                    <FontAwesomeIcon icon={faXmark} size={16} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Giỏ hàng</Text>
                <View style={{ width: 24 }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeIcon: {
        color: '#000',
    },

});

export default Header;
