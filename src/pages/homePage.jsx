import React, { memo, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Button, TextInput, FlatList } from 'react-native';
import SlideAvertisement from '../components/slideAvertisement.jsx';
import ListCategory from '../components/listCategory.jsx';
import FrameAddress from '../components/frameAddress.jsx';
import BarSearch from '../components/barSearch.jsx';


const FirstScreen = () => {
  const [isFixed, setIsFixed] = useState(false);

  const dataAdvertisement = [
    {
      id: 1,
      title: "adv01",
      src: require(`../../assets/listAdv/adv01.png`)
    },
    {
      id: 2,
      title: "adv02",
      src: require(`../../assets/listAdv/adv02.png`)
    },
    {
      id: 3,
      title: "adv03",
      src: require(`../../assets/listAdv/adv03.png`)
    },
    {
      id: 4,
      title: "adv04",
      src: require(`../../assets/listAdv/adv04.png`)
    },
    {
      id: 5,
      title: "adv05",
      src: require(`../../assets/listAdv/adv05.png`)
    },
    {
      id: 6,
      title: "adv06",
      src: require(`../../assets/listAdv/adv06.png`)
    }
  ];

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