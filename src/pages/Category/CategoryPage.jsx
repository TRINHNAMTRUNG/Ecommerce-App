import React, { memo, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Sidebar from "../../components/Category/sidebar";
import CategoryGrid from "../../components/Category/categoryGrid";
import OfferComponent from "../../components/Category/offer";
import { getListRootCategory } from "../../services/categoryService";
import BarSearch from "../../components/Home/barSearch";

const CategoryPage = ({ navigation }) => {
  const typeIdDefault = "1111";
  const [listRoot, setListRoot] = useState([]);
  const [typeCatg, setTypeCateg] = useState({ typeIdCatg: typeIdDefault, name: "Danh mục đang hot" });
  useEffect(() => {
    console.log("OMG")
    fetchListRoot();
  }, []);
  const fetchListRoot = async () => {
    try {
      const result = await getListRootCategory();

      const list = [
        {
          name: "Gợi ý cho bạn",
          image: "https://res.cloudinary.com/dqxdekfst/image/upload/v1732764797/CloudinaryDemo/qh8od51zew6xhsrhbpgh.png",
          _id: typeIdDefault
        },
        ...result.data ? result.data : []
      ];
      setListRoot(list);
    } catch (error) {

    }
  }

  return (
    <View style={styles.container}>
      <BarSearch isFixed={true} navigation={navigation} />
      <OfferComponent />

      <View style={styles.mainContentWrapper}>
        <Sidebar ctg={listRoot} setTypeCateg={setTypeCateg} />
        <View style={{ flex: 3.3 }}>
          <FlatList
            style={[styles.categoryGridWrapper, { flex: 3 }]}
            data={[1]}
            renderItem={() => <CategoryGrid typeCatg={typeCatg} typeIdDefault={typeIdDefault} navigation={navigation} />}
            keyExtractor={() => "categoryGrid"}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 100,
    alignItems: "center"
  },
  mainContentWrapper: {
    flexDirection: "row", // Đặt các phần tử ngang hàng
    flex: 1,
    padding: 4,
    marginTop: 5
  },
  sidebarWrapper: {
    flex: 1, // Sidebar chiếm 1 phần không gian
    backgroundColor: "#e0f7fa", // Màu nền riêng cho sidebar
    marginRight: 6, // Khoảng cách giữa Sidebar và CategoryGrid
  },
  categoryGridWrapper: {
    flex: 3, // CategoryGrid chiếm 3 phần không gian
  },
});

export default memo(CategoryPage);
