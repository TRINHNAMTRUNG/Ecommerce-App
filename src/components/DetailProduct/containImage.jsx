import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  require('../../assets/listAdv/adv01.png'),
  require('../../assets/listAdv/adv02.png'),
  require('../../assets/listAdv/adv03.png'),
  require('../../assets/listAdv/adv04.png'),
  require('../../assets/listAdv/adv05.png'),
  
];

const StrainerImage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleThumbnailPress = (index) => {
    setActiveIndex(index);
    scrollViewRef.current.scrollTo({ x: index * width, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        onScroll={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <FlatList
        data={images}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleThumbnailPress(index)} style={styles.thumbnailContainer}>
            <Image source={item} style={[styles.thumbnail, activeIndex === index && styles.activeThumbnail]} />
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.thumbnailList}
        contentContainerStyle={styles.thumbnailListContent}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 390, // Chiều cao tổng thể
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  carousel: {
    width: '100%',
    height: 390, // Chiều cao của carousel
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Đảm bảo ảnh không bị biến dạng
  },
  thumbnailList: {
    paddingHorizontal: 20, // Khoảng cách từ viền trái và phải
    marginTop: -70, // Giảm khoảng cách giữa carousel và danh sách thumbnail
  },
  thumbnailListContent: {
    alignItems: 'center',
  },
  thumbnailContainer: {
    padding: 5,
  },
  thumbnail: {
    width: 60,
    height: 60,
    resizeMode: 'cover', // Đảm bảo ảnh không bị méo
    borderWidth: 2,
    borderColor: '#ddd',
  },
  activeThumbnail: {
    borderColor: '#007bff', // Màu sắc viền cho thumbnail đang được chọn
  },
});

export default StrainerImage;
