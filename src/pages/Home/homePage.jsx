import React, { memo, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Button, TextInput, FlatList } from 'react-native';

import SlideAvertisement from '../../components/Home/slideAvertisement.jsx'
import ListCategory from '../../components/Home/listCategory.jsx'
import FrameAddress from '../../components/Home/frameAddress.jsx';
import BarSearch from '../../components/Home/barSearch.jsx';

import { dataAdvertisement } from '../../data/dataObject.js';

const FirstScreen = () => {
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
          <SlideAvertisement
            dataAdvertisement={dataAdvertisement}
            isFixed={isFixed}
          />
        </View>

        <View style={stylesHomePage.frameBody}>
          <ListCategory />
          <ListCategory />
          <ListCategory />
          <ListCategory />
          <ListCategory />
          <ListCategory />
          <ListCategory />
          <ListCategory />
          <FrameAddress />
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
    alignItems: "center"
  }
});

export default memo(FirstScreen);