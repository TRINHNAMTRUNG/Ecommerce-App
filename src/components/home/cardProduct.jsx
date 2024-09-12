import { StyleSheet } from "react-native";
import { View } from "react-native";


const CardProduct = () => {
    return (
        <View style={styleCardProduct.containerCard}>

        </View>
    );
}

const styleCardProduct = StyleSheet.create({
    containerCard: {
        flex: 0.75,
        height: "100%",
        marginRight: 10,
        borderRadius: 10,
        padding: 5,
        alignItems: "center"
    },
    frameImage: {
        flex: 1,

    },
    frameTitle: {
        height: "10%",
    },
    framePrice: {

    }
});
export default CardProduct;