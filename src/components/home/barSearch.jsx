import { useEffect, useRef } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet, Animated } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
const BarSearch = ({ isFixed }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Bắt đầu với opacity 0

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1, // opacity chuyển tới 1 (rõ dần)
            duration: 300, // Thời gian hiệu ứng (2 giây)
            useNativeDriver: true,
        }).start(); // Bắt đầu animation
    }, [fadeAnim]);
    return (
        <Animated.View style={[stylesBarSearch.barSearch, isFixed ? stylesBarSearch.fixedHeader : null, { opacity: fadeAnim }]} >
            <TextInput
                style={stylesBarSearch.boxSearch}
                placeholder='Freeship đơn từ 15k'
            />
            <TouchableOpacity style={stylesBarSearch.buttonCart}>
                <Icon name="shopping-cart" size={20} />
            </TouchableOpacity>
        </Animated.View>
    );
}

const stylesBarSearch = StyleSheet.create({
    barSearch: {
        width: "90%",
        height: 50,
        marginTop: "38%",
        marginBottom: "2%",
        backgroundColor: "white",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 8
    },
    fixedHeader: {
        position: "absolute",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "gray",
        borderRadius: 0,
        width: "100%",
        height: 90,
        paddingTop: 40,
        marginTop: 0,
        top: 0,
        zIndex: 1,
    },
    boxSearch: {
        width: "80%",
        height: "100%",
        borderWidth: 1.2,
        borderColor: "gray",
        borderRadius: 5,
        paddingLeft: 15
    },
    buttonCart: {
        width: 40,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

});

export default BarSearch;
