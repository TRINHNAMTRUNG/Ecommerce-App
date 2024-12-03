import { memo, useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet, Animated } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getSearchProduct } from "../../services/productService";
import { useNavigationState } from "@react-navigation/native";
const BarSearch = ({ isFixed, navigation, keepSearching }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Bắt đầu với opacity 0
    const [textSearch, setTextSearch] = useState("");
    const state = useNavigationState((state) => state);
    const currentPage = state.routes[state.index].name;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1, // opacity chuyển tới 1 (rõ dần)
            duration: 300, // Thời gian hiệu ứng (2 giây)
            useNativeDriver: true,
        }).start(); // Bắt đầu animation
    }, [fadeAnim]);

    const fetchSearchProduct = async (page) => {
        try {
            const data = { name: textSearch, page, isShowLoading: true };
            const res = await getSearchProduct(data);
            const dataSearch = {
                data: res.data.listProduct,
                namePipeline: "Kết quả tìm được",
                maxPage: res.data.totalPages,
                textSearch: textSearch
            };
            if (currentPage === "searchPage") {
                keepSearching(dataSearch);
            } else {
                navigation.navigate("searchPage", { dataSearch, typeFetch: "SEARCH_TEXT" });
            }
        } catch (error) {
            const dataSearch = {
                data: [],
                namePipeline: "Kết quả tìm được",
                maxPage: 0,
                textSearch: textSearch
            };
            if (currentPage === "searchPage") {
                keepSearching(dataSearch);
            } else {
                navigation.navigate("searchPage", { dataSearch, typeFetch: "SEARCH_TEXT" });
            }
            console.log("ERRROOOOO KHI LAY DANH SACH SEARCH")
        }
    };
    const handleSearch = () => {
        if (textSearch !== "") {
            fetchSearchProduct(1);
        }
    }
    return (
        <Animated.View style={[stylesBarSearch.barSearch, isFixed ? stylesBarSearch.fixedHeader : null, { opacity: fadeAnim }]} >
            <View style={stylesBarSearch.boxSearch}>
                <TextInput
                    style={{ flex: 1 }}
                    placeholder='Freeship đơn từ 15k'
                    placeholderTextColor="#D3D1D3"
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                    value={textSearch}
                    onChangeText={(value) => setTextSearch(value)}
                />
                <TouchableOpacity onPress={() => handleSearch()} style={stylesBarSearch.btnSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" size={21} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={stylesBarSearch.buttonCart} onPress={() => navigation.navigate("cartPage")}>
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
        padding: 5
    },
    fixedHeader: {
        position: "absolute",
        shadowColor: "black",
        elevation: 8,
        borderRadius: 0,
        width: "100%",
        height: 90,
        paddingTop: 45,
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
        paddingLeft: 15,
        position: "relative",
    },
    buttonCart: {
        width: 40,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    btnSearch: {
        position: "absolute",
        right: 10,
        top: 8
    }
});

export default memo(BarSearch);
