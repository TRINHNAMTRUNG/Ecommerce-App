import React, { memo, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Text, TextInput, FlatList, StatusBar } from 'react-native';

import SlideAdvertisement from '../../components/Home/slideAvertisement.jsx';
import ListCategory from '../../components/Home/listCategory.jsx';
import FrameAddress from '../../components/Home/frameAddress.jsx';
import BarSearch from '../../components/Home/barSearch.jsx';

import { dataAdvertisement, dataProduct } from '../../data/dataObject.js';
import ListProduct from '../../components/Home/listProduct.jsx';

const HomePage = ({ navigation }) => {
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    if (scrollPosition > 200) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  }

  return (
    <>
      {isFixed && <BarSearch isFixed={isFixed} />}
      <ScrollView style={stylesHomePage.frameContainer} onScroll={(e) => handleScroll(e)} scrollEventThrottle={16}>
        <View style={stylesHomePage.frameHeader}>
          <Image source={require("../../assets/thumb/backgr_image.png")} style={stylesHomePage.imageHeader} />
          {isFixed === false && <BarSearch isFixed={isFixed} />}
          <SlideAdvertisement
            dataAdvertisement={dataAdvertisement}
            isFixed={isFixed}
          />
        </View>

        <View style={stylesHomePage.frameBody}>
          <ListCategory />
          <FrameAddress />
          <View style={stylesHomePage.frameListProducts}>
            <ListProduct dataProduct={dataProduct} />
          </View>
          <View style={stylesHomePage.frameListProducts}>
            <ListProduct dataProduct={dataProduct} />
          </View>
          <View style={stylesHomePage.frameListProducts}>
            <ListProduct dataProduct={dataProduct} />
          </View>
          <View style={stylesHomePage.frameListProducts}>
            <ListProduct dataProduct={dataProduct} />
          </View>
          <TouchableOpacity style={{ backgroundColor: "pink", width: 200, padding: 10, borderRadius: 10, margin: 10 }} onPress={() => { navigation.navigate("homeDetail") }}>
            <Text style={{ textAlign: "center" }}>Go HomeDetail</Text>
          </TouchableOpacity>
        </View>
      </ScrollView >
    </>

  );
}

const stylesHomePage = StyleSheet.create({
  frameContainer: {
    width: "100%",
    flexDirection: "column",
    flex: 1
  },
  frameHeader: {
    flex: 1.8,
    position: "relative",
    alignItems: "center",
  },
  frameListProducts: {

  },
  imageHeader: {
    position: "absolute",
    height: "65%",
    width: "100%",
    top: 0,
    borderBottomRightRadius: 85,
    borderBottomLeftRadius: 85,
  },
  slide: {
    width: 310,
    height: 150,
  },
  frameBody: {
    flex: 2,
    // alignItems: "center"
  }
});

export default memo(HomePage);