import React, { memo, useEffect, useState } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, ScrollView } from 'react-native';

import FrameAddress from '../../components/Home/frameAddress.jsx';
import BarSearch from '../../components/Home/barSearch.jsx';
import { getListByCatg, getSearchProduct } from "../../services/productService.js";
import SuggestedProducts from '../../components/Home/suggestedProduct.jsx';
import BarFilter from '../../components/Home/barFilter.jsx';
import { dataAdvertisement, dataAdvertisement1, dataAdvertisement2 } from '../../data/dataObject.js';
import SlideAvertisement from '../../components/Home/slideAvertisement.jsx';
import MoreCategory from '../../components/Home/moreCategory.jsx';
const { height } = Dimensions.get("window");

const SearchPage = ({ route }) => {
    const { typeFetch, dataSearch = {}, dataChildCatg = {} } = route?.params || {};
    const [textSearch, setTextSearch] = useState(dataSearch?.textSearch ? dataSearch.textSearch : "");
    const [listPipelineSec, setListPipelineSec] = useState(dataSearch ? dataSearch.data : []);
    const [page, setPage] = useState(2);
    const [maxPage, setMaxPage] = useState(dataSearch.maxPage);
    const [isLoading, setIsLoading] = useState(false);
    const [sort_by, setSort_by] = useState("");
    const [order, setOrder] = useState("");
    const listFilter = ["Phổ biến", "•", "Bán chạy", "•", "Hàng mới", "•", "Giá"];
    const [filterSelected, setFilterSelected] = useState(listFilter ? listFilter[0] : "");
    const [typeSort, setTypeSort] = useState(0);
    const [listAdvert, setListAdvert] = useState([]);
    useEffect(() => {
        if (sort_by) {
            fetchData(1);
        }
    }, [sort_by, order]);
    useEffect(() => {
        if (route.params?.dataSearch) {
            setListPipelineSec(dataSearch.data);
            const listThumb = [dataAdvertisement, dataAdvertisement1, dataAdvertisement2];
            const randomIndex = Math.floor(Math.random() * listThumb.length);
            setListAdvert(listThumb[randomIndex]);
        }
    }, [route]);
    const fetchData = async (page) => {
        let newData = null;
        let data = null;
        switch (typeFetch) {
            case "SEARCH_TEXT":
                data = {
                    name: textSearch,
                    page,
                    isShowLoading: false,
                    sort_by,
                    order
                };
                newData = await getSearchProduct(data);
                break;
            case "SEARCH_CATG":
                data = {
                    page,
                    idCatg: dataSearch.idCatg,
                    isShowLoading: false,
                    sort_by,
                    order
                };
                newData = await getListByCatg(data);
                break;
            default:
                data = {
                    name: dataSearch.textSearch,
                    page,
                    isShowLoading: false,
                    sort_by,
                    order
                };
                newData = await getSearchProduct(data);
                break;
        }
        if (page === 1) {
            setListPipelineSec(newData.data.listProduct);
        } else {
            setListPipelineSec((prev) => [...prev, ...newData.data.listProduct]);
        }
        setMaxPage(newData.data.totalPages);
        return newData;
    }
    const loadMoreData = async () => {
        // Nếu đã tải xong hoặc đang tải, không thực hiện gì
        if (isLoading || page > maxPage || !dataSearch?.data) {
            return;
        }
        setIsLoading(true);

        try {
            const newData = await fetchData(page);
            setListPipelineSec((prev) => [...prev, ...newData.data.listProduct]);
            setMaxPage(newData.data.totalPages);
            setPage((prev) => prev + 1);
        } catch (error) {
            console.error("Error loading more data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const keepSearching = (dataSearch) => {
        setListPipelineSec(dataSearch.data);
        setTextSearch(dataSearch.textSearch);
        setMaxPage(dataSearch.maxPage);
        setSort_by("");
        setOrder("");
        setFilterSelected(listFilter[0]);
        setTypeSort(0);
    }
    return (
        <View style={{ flex: 1 }}>
            <BarSearch isFixed={true} keepSearching={keepSearching} />
            {listPipelineSec.length > 0 ?
                <FlatList
                    style={stylesHomePage.frameContainer}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.1}
                    ListHeaderComponent={
                        <View style={stylesHomePage.frameHeader}>
                            <SlideAvertisement dataAdvertisement={listAdvert} />
                            {dataChildCatg && <MoreCategory dataChildCatg={dataChildCatg} />}
                            <BarFilter
                                setSort_by={setSort_by}
                                setOrder={setOrder}
                                filterSelected={filterSelected}
                                setFilterSelected={setFilterSelected}
                                listFilter={listFilter}
                                typeSort={typeSort}
                                setTypeSort={setTypeSort}
                            />
                            <FrameAddress />
                        </View>
                    }
                    ListFooterComponent={listPipelineSec.length > 0 &&
                        <View>
                            <SuggestedProducts listPipelineSec={listPipelineSec} isLoading={isLoading} namePipeline={dataSearch.namePipeline} />
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                />
                :
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ justifyContent: "center", alignItems: "center", height: height }}>
                        <Image source={require("../../assets/thumb/notFoundProd.png")} style={{ height: "20%", width: "100%" }} />
                    </View>
                </ScrollView>
            }
        </View>
    );
};

const stylesHomePage = StyleSheet.create({
    frameContainer: {
        width: "100%",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "white"
    },
    frameHeader: {
        flex: 1.8,
        position: "relative",
        alignItems: "center",
        backgroundColor: "white",
        marginTop: 100,
        backgroundColor: "white"
    },
    imageHeader: {
        position: "absolute",
        height: "65%",
        width: "100%",
        top: 0,
        borderBottomRightRadius: 85,
        borderBottomLeftRadius: 85,
    },
});

export default memo(SearchPage);
