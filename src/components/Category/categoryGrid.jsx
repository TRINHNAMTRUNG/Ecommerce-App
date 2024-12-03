import React, { memo, useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, SectionList, TouchableOpacity } from "react-native";
import LoadingComponent from "../loadComponent";
import { getAllLeafCategory, getCategoriesHierarchy, getCategoryByCatg } from "../../services/categoryService";
import { getListByCatg } from "../../services/productService";
const CategoryGrid = ({ typeCatg, typeIdDefault, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listCtg, setListCtg] = useState([]);
  useEffect(() => {
    if (typeCatg) {
      fetchListLeaf(typeCatg.typeIdCatg);
    }
  }, [typeCatg]);
  const fetchListLeaf = async (typeIdCatg) => {
    try {
      setIsLoading(true);
      if (typeIdCatg === typeIdDefault) {
        const result = await getAllLeafCategory();
        setListCtg(result.data);
      } else {
        const result = await getCategoriesHierarchy(typeIdCatg);
        setListCtg(result.data);
      }

    } catch (error) {
      console.log("DATA ERRROR: ", error)
    } finally {
      setIsLoading(false);
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
  if (isLoading) {
    return <LoadingComponent message="Đang tải danh mục, vui lòng chờ..." />;
  }
  return (
    <View style={styles.container}>
      {typeCatg && typeCatg.typeIdCatg === typeCatg.typeIdDefault || listCtg[0]?.children.length === 0 ?
        <FlatList
          key={'_'}
          data={listCtg}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategorySelect(item._id, item.name)}>
              <View style={styles.wrapImage}>
                <Image style={styles.categoryImage} source={{ uri: item.image }} />
              </View>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
          numColumns={3}
          style={styles.categoryGrid}
          ListHeaderComponent={
            <View style={styles.wrapHeaderlist}>
              <Text style={styles.headerText}>Danh mục đang hot</Text>
            </View>
          }
        />
        :
        <SectionList
          key={'#'}
          sections={listCtg.map(element => ({
            id: element._id,
            title: element.name,
            data: [{ list: element.children }],
          }))}
          style={styles.categoryGridSection}
          renderItem={({ item }) => (
            <FlatList
              key={'&'}
              data={item.list}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategorySelect(item._id, item.name)}>
                  <View style={styles.wrapImage}>
                    <Image style={styles.categoryImage} source={{ uri: item.image }} />
                  </View>
                  <Text style={styles.categoryText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id}
              numColumns={3}
              style={styles.categoryGrid}
            />
          )}
          keyExtractor={(item) => `catg - ${item._id}`}
          renderSectionHeader={({ section: { title, id } }) => (
            <TouchableOpacity style={styles.wrapHeaderlist} onPress={() => handleCategorySelect(id, title)}>
              <Text style={styles.header}>{title}</Text>
              <Text style={[styles.header, { color: "#0A68FF" }]}>Tất cả</Text>
            </TouchableOpacity>
          )}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
    justifyContent: "space-around",
    backgroundColor: "#EEEEEE"
  },
  headerText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#333',  // Màu chữ tiêu đề
  },
  categoryItem: {
    alignItems: "center",
    margin: 2,
    width: "30%",
    textAlign: "center",
    marginRight: 10,
    marginTop: 10,
    backgroundColor: "white"
  },
  wrapImage: {
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  categoryImage: {
    width: "80%",
    height: "80%",
  },
  categoryGrid: {
    flex: 1,
    backgroundColor: "white",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 6
  },
  categoryGridSection: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  categoryText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 12,
    maxWidth: 68
  },
  wrapHeaderlist: {
    backgroundColor: "white",
    marginTop: 6,
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    alignItems: "center"
  },
  header: {
    fontSize: 13,
    fontWeight: "500",
  }
});

export default memo(CategoryGrid);
