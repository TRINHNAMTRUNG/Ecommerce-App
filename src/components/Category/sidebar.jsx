import React, { useEffect, useState } from "react";
import { Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const Sidebar = ({ ctg, setTypeCateg }) => {

  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log("UOWWW ", selectedCategory);
  useEffect(() => {
    if (ctg.length > 0) {
      const firstCategoryId = ctg[0]._id;
      setSelectedCategory(firstCategoryId);
    }
  }, [ctg]);
  const handleCategorySelect = (typeIdCatg, name) => {
    console.log(typeIdCatg)
    setTypeCateg({ typeIdCatg, name });
    setSelectedCategory(typeIdCatg);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.sidebarItem,
        selectedCategory === item._id && styles.selectedItem,
      ]}
      onPress={() => handleCategorySelect(item._id, item.name)}
    >
      <Image style={styles.icon} source={{ uri: item.image }} />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.sidebar}
      data={ctg}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item.name}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "#DBEEFF",
    borderRightWidth: 2,
    borderColor: "#EEEEEE"
  },
  sidebarItem: {
    alignItems: "center",
    paddingVertical: 20,
    flexDirection: "column",
    borderBottomWidth: 2,
    borderBottomColor: "#EEEEEE",
  },
  selectedItem: {
    backgroundColor: "#ffffff", //nền select
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 8,
  },
  text: {
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
    color: "#333",
    fontWeight: "500"
  },
});

export default Sidebar;
