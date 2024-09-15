import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import Nav from "../../components/DetailProduct/navbar";
import InforProduct from "../../components/DetailProduct/inforProduct";
import ButtonContainer from "../../components/DetailProduct/buttonContainerProduct";
import StrainerImage from "../../components/DetailProduct/containImage";
import ShippingInfo from "../../components/DetailProduct/shippingInfo";
import InfoSection from "../../components/DetailProduct/InfoSectionProduct";
import ShoppingAssurance from "../../components/DetailProduct/shoppingAssurance";
import DetailInfo from "../../components/DetailProduct/detailInfo";
import CustomerReview from "../../components/DetailProduct/customerReview";


const DetailProductPage = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

    // Show ButtonContainer only when it's not in the viewport
    setIsButtonVisible(!isCloseToBottom);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Nav isSearchVisible={true} />
        <ScrollView
          style={styles.scrollView}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <StrainerImage />
          <InforProduct />
          <InfoSection />
          <ShippingInfo />
          <ButtonContainer />
          <ShoppingAssurance />
          <DetailInfo />
          <CustomerReview/>

        </ScrollView>
        {/* Always show ButtonContainer at the bottom */}
        <View style={[styles.buttonContainer, { display: isButtonVisible ? 'none' : 'flex' }]}>
          <ButtonContainer />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1, // Ensure ScrollView takes the full height
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

export default DetailProductPage;
