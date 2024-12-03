import { memo, useEffect, useRef, useState } from "react";
import { View, Image, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import CardProduct from "./cardProduct";
import titleDeal from "../../assets/thumb/titleDeal.png"
const { height } = Dimensions.get("window");

const ListColumnProduct = ({ dataPipeline, showHorizon }) => {
    const { data, namePipeline } = dataPipeline;
    const [page, setPage] = useState(2);
    const maxPage = useRef(dataPipeline.maxPage);
    const [listProduct, setListProduct] = useState(data);

    const loadMoreData = async () => {
        console.log("LOAD ........../", page)
        if (page <= maxPage.current) {
            const newData = await dataPipeline.passedfetch(page);
            setListProduct((prev) => [...prev, ...newData.data.listProduct]);
            setPage(page + 1);
        }
    }

    return (
        <View style={stylesListProduct.containerListProduct}>
            <View style={stylesListProduct.frameTitleList}>
                {/* <Image source={titleDeal} style={stylesListProduct.imageTitleList} /> */}
                <Text style={stylesListProduct.textShowAll}>{namePipeline}</Text>
                <Text style={stylesListProduct.textShowAll}>Xem tất cả</Text>
            </View>
            {data && data.length > 0 ?
                <FlatList
                    nestedScrollEnabled
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-around" }}
                    style={[stylesListProduct.frameListProduct, { flexDirection: "column" }]}
                    data={listProduct}
                    renderItem={({ item }) => <CardProduct product={item} />}
                    keyExtractor={(item) => `prod-${item._id}`}  // keyExtractor rõ ràng để tránh lỗi
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.5}
                />
                :
                <View style={{ justifyContent: "center", alignItems: "center", height: 300 }}>
                    <Image source={require("../../assets/thumb/notFoundProd.png")} style={{ width: "auto", height: "100%" }} />
                </View>
            }
        </View>
    );
};

const stylesListProduct = StyleSheet.create({
    containerListProduct: {
        width: "100%",
        // minHeight: 370,
        height: height + height * 0.5,
        padding: 16,
        backgroundColor: "white",
        marginTop: 12,
    },
    frameListProduct: {
        flex: 1,
    },
    frameTitleList: {
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    imageTitleList: {
        width: 204,
        height: 32,
    },
    textShowAll: {
        fontSize: 14,
        fontWeight: "500",
        color: "#0A68FF",
    },
    gridContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap', // Cho phép các phần tử tràn xuống dòng mới
        justifyContent: 'space-between',
    },
    cardWrapper: {
        width: '48%', // Chia thành 2 cột, mỗi cột chiếm 48% chiều rộng
        marginBottom: 16,
    },
    firstColumn: {
        marginLeft: '4%', // Khoảng cách bên trái giữa các cột
    }
});

export default memo(ListColumnProduct);