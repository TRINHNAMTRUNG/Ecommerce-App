import { useEffect, useRef } from "react";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import CardProduct from "./cardProduct";
import titleDeal from "../../assets/thumb/titleDeal.png"
const ListProduct = ({ dataProduct }) => {

    return (
        <View style={stylesListProduct.containerListProduct}>
            <View style={stylesListProduct.frameTitleList}>
                <Image source={require = titleDeal} style={stylesListProduct.imageTitleList} />
                <Text style={stylesListProduct.textShowAll}>Xem tất cả</Text>
            </View>
            <FlatList
                style={stylesListProduct.frameListProduct}
                data={dataProduct}
                renderItem={({ item }) => <CardProduct product={item} />}
                keyExtractor={(item) => `prod-${item.id}`}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            />
        </View>

    );
}

const stylesListProduct = StyleSheet.create({
    containerListProduct: {
        width: "100%",
        height: 381,
        padding: 16,
        backgroundColor: "white",
        marginTop: 12
    },
    frameListProduct: {
        flex: 1,
        flexDirection: "row",
    },
    frameTitleList: {
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    imageTitleList: {
        width: 204,
        height: 32
    },
    textShowAll: {
        fontSize: 14,
        fontWeight: "500",
        color: "#0A68FF"
    }
});

export default ListProduct;
