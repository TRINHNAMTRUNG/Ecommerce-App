import { useEffect, useRef } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet, Animated, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
const ListProduct = ({ isFixed }) => {

    return (
        <ScrollView style={stylesListProduct.containerListProduct}>

        </ScrollView>
    );
}

const stylesListProduct = StyleSheet.create({
    containerListProduct: {
        width: "100%",
        height: 100,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 8
    },

});

export default ListProduct;
