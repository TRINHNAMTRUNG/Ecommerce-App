import { StyleSheet, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
const FrameAddress = () => {
    return (
        <View style={stylesFrameAddress.frameAddress}>
            <Icon name="location" size={10} style={stylesFrameAddress.icon} />
            <Text style={stylesFrameAddress.textHL}>Giao đến: </Text>
            <Text style={stylesFrameAddress.textAddress}>Q.Gò Vấp, P.01, Hồ Chí Minh</Text>
        </View>
    )
}
const stylesFrameAddress = StyleSheet.create({
    frameAddress: {
        height: 40,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 16,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: "#FFFFFF"
    },
    icon: {
        color: "#D84245",
        fontSize: 20
    },
    textHL: {
        color: "gray",
        marginLeft: 10,
        marginRight: 5,
        fontSize: 14,
        fontWeight: "500",
    },
    textAddress: {
        fontSize: 14,
        fontWeight: "500",
        textDecorationLine: "underline"
    }
})
export default FrameAddress;