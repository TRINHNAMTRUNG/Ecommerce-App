import { memo, useRef, useState } from "react";
import { View, Image, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import CardProduct from "./cardProduct";

const ListProduct = ({ dataPipeline, showHorizon }) => {
  const { data, namePipeline } = dataPipeline;
  const [page, setPage] = useState(2);
  const maxPage = useRef(dataPipeline.maxPage);
  const [listProduct, setListProduct] = useState(data);
  const [isLoading, setIsLoading] = useState(false);

  const renderLoader = () => {
    return (
      <View style={{ height: "100%", marginHorizontal: 16, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color='#1670FF' />
      </View>
    )
  }
  const loadMoreData = async () => {

    if (page <= maxPage.current) {
      try {
        console.log("page <= maxPage.current ", page <= maxPage.current);
        setPage(page + 1);
        setIsLoading(true);
        const newData = await dataPipeline.passedfetch(page, false);
        console.log(newData)
        setListProduct((prev) => [...prev, ...newData.data.listProduct]);
      } catch (error) {
        console.log("Error loading more data: ", error)
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <View style={stylesListProduct.containerListProduct}>
      <View style={stylesListProduct.frameTitleList}>
        {/* <Image source={titleDeal} style={stylesListProduct.imageTitleList} /> */}
        <Text style={stylesListProduct.textNamePipeline}>{namePipeline}</Text>
        <Text style={stylesListProduct.textShowAll}>Xem tất cả</Text>
      </View>
      {data && data.length > 0 ?
        (
          <FlatList
            nestedScrollEnabled
            style={[stylesListProduct.frameListProduct, { flexDirection: "row" }]}
            data={listProduct}
            renderItem={({ item }) => <CardProduct product={item} />}
            keyExtractor={(item) => `prod - ${item._id}`}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            onEndReached={loadMoreData} // Gọi khi gần cuối
            onEndReachedThreshold={0.5} // Kích hoạt khi còn 50% để cuộn
            ListFooterComponent={isLoading && renderLoader()}
          />
        )
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
    minHeight: 370,
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
  textNamePipeline: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FF424E",
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

export default memo(ListProduct);