import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const colors = ['#BFEFFF', '#FFF2D0', '#F6D2FF', '#FFEAD7', '#BCC5FF', '#CBFEFF', '#D6FFBF', '#FFEBF6', '#FFB2B2', '#D1C8FF'];
import { getCategoryByCatg, getListRootCategory } from "../../services/categoryService";
import { memo, useEffect, useState } from "react";
import { getListByCatg } from "../../services/productService";
const ListCategory = ({ navigation }) => {

    const [listRootCatg, setListRootCatg] = useState([]);
    useEffect(() => {
        console.log(">>>>");
        fetchListRoot();
    }, []);
    const fetchListRoot = async () => {
        try {
            const res = await getListRootCategory();
            if (res.data && res.success === true) {
                setListRootCatg(res.data);
            }
        } catch (error) {
        }
    }
    const handleCategorySelect = async (idCatg, nameCatg) => {
        console.log("CLICK ", idCatg);
        try {
            const resultProd = await getListByCatg({ page: 1, idCatg, isShowLoading: false });
            // console.log("CLICK data", resultProd.listProduct);
            const resultCatg = await getCategoryByCatg(idCatg, true);
            console.log("LISSST CATG CHILD :           ", resultCatg);
            const dataChildCatg = {
                categories: resultCatg.data,
                nameCatg: resultCatg.data.length === 0 ? "" : nameCatg
            };
            const dataSearch = {
                data: resultProd.data.listProduct,
                namePipeline: "Kết quả tìm được",
                maxPage: resultProd.data.totalPages,
                // listCatgChild: resultCatg.data,
                idCatg
            };
            // console.log("CLICK search", dataSearch);
            navigation.navigate("searchPage", { dataSearch, typeFetch: "SEARCH_CATG", dataChildCatg });
        } catch (error) {
            console.log(error.message, ": ", error.errors[0]);
        }
    }
    return (
        <View style={styleListCategory.LsCategoryContainer}>
            {listRootCatg && listRootCatg.length !== 0 && colors.length === listRootCatg.length &&
                listRootCatg.map((item, index) => {
                    return (
                        <View style={styleListCategory.cardCategory} key={`catg-${index}`}>
                            <TouchableOpacity onPress={() => handleCategorySelect(item._id, item.name)}>
                                <LinearGradient colors={[colors[index], '#FFFFFF']} style={styleListCategory.itemCategory}>
                                    <Image source={{ uri: item.image }} style={styleListCategory.imageCategory} />
                                </LinearGradient>
                            </TouchableOpacity>
                            <Text style={styleListCategory.nameCategory} numberOfLines={2}> {item.name} </Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

const styleListCategory = StyleSheet.create({
    LsCategoryContainer: {
        width: "100%",
        maxHeight: 200,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        backgroundColor: "#FFFFFF",
        padding: 16,
        paddingBottom: 4,
        overflow: "hidden",
        overflow: "scroll",
        borderColor: "#EEEEEE",
        borderBottomWidth: 3
    },
    itemCategory: {
        width: 50,
        height: 50,
        shadowColor: "black",
        elevation: 8,
        borderRadius: 7,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    imageCategory: {
        width: "67%",
        height: "67%",
    },
    cardCategory: {
        justifyContent: "center",
        paddingLeft: 5,
        paddingRight: 5
    },
    nameCategory: {
        textAlign: "center",
        flexWrap: 'wrap',
        width: 60,
        fontSize: 10,
        fontWeight: "500",
        marginBottom: 8,
        height: 25
    }
})

export default memo(ListCategory);