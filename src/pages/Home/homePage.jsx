import React, { memo, useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import SlideAvertisement from "../../../src/components/home/slideAvertisement.jsx";
import ListCategory from "../../../src/components/home/listCategory.jsx";
import FrameAddress from "../../../src/components/home/frameAddress.jsx";
import BarSearch from "../../../src/components/home/barSearch.jsx";
import { dataAdvertisement } from "../../data/dataObject.js";
import {
  getListTopDeal,
  getListTopDealBook,
  getListTopDealNew,
} from "../../services/productService.js";
import SuggestedProducts from "../../../src/components/home/suggestedProduct.jsx";
import ListProduct from "../../../src/components/home/listProduct.jsx";

const HomePage = ({ navigation }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [listPipeline, setListPipeline] = useState([]);
  const [listPipelineSec, setListPipelineSec] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const scrollPosition = useRef(0);

  useEffect(() => {
    fetchListTopDeal(1);
    fetchListTopDealBook(1);
  }, []);

  const fetchListTopDeal = async (page) => {
    try {
      const res = await getListTopDeal(page, true);
      const dataPipeline = {
        data: res.data.listProduct,
        namePipeline: "Top Deal - Siêu Rẻ",
        maxPage: res.data.totalPages,
        passedfetch: getListTopDeal,
      };
      setListPipeline((prev) => [...prev, dataPipeline]);
    } catch (error) {
      const dataPipeline = {
        data: [],
        namePipeline: "Top Deal - Siêu Rẻ",
        maxPage: 0,
      };
      setListPipeline((prev) => [...prev, dataPipeline]);
    }
  };

  const fetchListTopDealBook = async (page) => {
    try {
      const res = await getListTopDealBook(page, true);
      const dataPipeline = {
        data: res.data.listProduct,
        namePipeline: "Top Deal - Xả Kho Sách",
        maxPage: res.data.totalPages,
        passedfetch: getListTopDealBook,
      };
      setListPipeline((prev) => [...prev, dataPipeline]);
    } catch (error) {
      const dataPipeline = {
        data: [],
        namePipeline: "Top Deal - Xả Kho Sách",
        maxPage: 0,
      };
      setListPipeline((prev) => [...prev, dataPipeline]);
    }
  };

  const loadMoreData = async () => {
    // Nếu đã tải xong hoặc đang tải, không thực hiện gì
    if (isLoading || page > maxPage) {
      return;
    }
    setIsLoading(true);

    try {
      const newData = await getListTopDealNew(page, false);
      setListPipelineSec((prev) => [...prev, ...newData.data.listProduct]);
      setMaxPage(newData.data.totalPages);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading more data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = (e) => {
    const { contentOffset } = e.nativeEvent;
    const y = contentOffset.y;
    if (Math.abs(y - scrollPosition.current) > 200) {
      setIsFixed(y > 200);
      scrollPosition.current = y;
    }
  };

  const renderItem = ({ item }) => (
    <ListProduct dataPipeline={item} showHorizon={true} />
  );
  const renderLoader = () => {
    return (
      <View style={{ marginVertical: 16, alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="#1670FF" />
      </View>
    );
  };

  return (
    <>
      {isFixed && <BarSearch isFixed={isFixed} navigation={navigation} />}
      <FlatList
        style={stylesHomePage.frameContainer}
        data={listPipeline}
        renderItem={renderItem}
        keyExtractor={(item, index) => `topDeal-${index}`}
        onScroll={handleScroll}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <View>
            <View style={stylesHomePage.frameHeader}>
              <Image
                source={require("../../assets/thumb/backgr_image.png")}
                style={stylesHomePage.imageHeader}
              />
              {isFixed === false && (
                <BarSearch isFixed={isFixed} navigation={navigation} />
              )}
              <SlideAvertisement
                dataAdvertisement={dataAdvertisement}
                isFixed={isFixed}
              />
            </View>
            <ListCategory navigation={navigation} />
            <FrameAddress />
          </View>
        }
        ListFooterComponent={
          listPipelineSec.length > 0 && (
            <View>
              <SuggestedProducts
                listPipelineSec={listPipelineSec}
                isLoading={isLoading}
                namePipeline={"Gợi ý cho bạn"}
              />
            </View>
          )
        }
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

const stylesHomePage = StyleSheet.create({
  frameContainer: {
    width: "100%",
    flexDirection: "column",
    flex: 1,
  },
  frameHeader: {
    flex: 1.8,
    position: "relative",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 5,
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

export default memo(HomePage);
