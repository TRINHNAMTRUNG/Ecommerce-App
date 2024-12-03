import React, { memo, useState } from "react";
import { View, ScrollView, StyleSheet, Keyboard } from "react-native";
import Nav from "../../components/DetailProduct/navbar";
import InforProduct from "../../components/DetailProduct/inforProduct";
import ButtonContainer from "../../components/DetailProduct/buttonContainerProduct";
import StrainerImage from "../../components/DetailProduct/containImage";
import ShippingInfo from "../../components/DetailProduct/shippingInfo";
import InfoSection from "../../components/DetailProduct/InfoSectionProduct";
import ShoppingAssurance from "../../components/DetailProduct/shoppingAssurance";
import DetailInfo from "../../components/DetailProduct/detailInfo";
import CustomerReview from "../../components/DetailProduct/customerReview";

const DetailProductPage = ({ navigation, route }) => {
  let product = {};
  if (route?.params) {
    product = route.params.product;
  }
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

    // Show ButtonContainer only when it's not in the viewport
    setIsButtonVisible(!isCloseToBottom);
  };
  console.log("Hien thi lan first");
  return (
    <View style={styles.container}>
      <Nav isSearchVisible={true} />
      <ScrollView
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <StrainerImage product={product} />
        <InforProduct product={product} />
        <InfoSection />
        <ShippingInfo />
        <ButtonContainer product={product} navigation={navigation} />
        <ShoppingAssurance />
        <DetailInfo product={product} />
        <CustomerReview product={product} />
      </ScrollView>
      {/* Always show ButtonContainer at the bottom */}
      <View style={[styles.buttonContainer, { display: isButtonVisible ? 'none' : 'flex' }]}>
        <ButtonContainer product={product} navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  scrollView: {
    flexGrow: 1, // Cho phép các phần tử con mở rộng
    paddingBottom: 60, // Chừa không gian cho ButtonContainer
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: ['#ff7e5f', '#feb47b'],
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
    zIndex: 10, // Ensure the button container is above other content
  },
});

export default memo(DetailProductPage);
