import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PromoFooter = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Xong</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingBottom: 10,
        paddingTop: 10, 
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        paddingVertical: 15,
        borderRadius: 5,
        width: '100%',
        maxWidth: 380,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});

export default PromoFooter;
