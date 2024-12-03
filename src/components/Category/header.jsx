import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [cartCount, setCartCount] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Sản phẩm, thương hiệu..."
        />
      </View>
      <View style={styles.cartContainer}>
        <FontAwesomeIcon icon={faShoppingCart} style={styles.cartIcon} />
        {cartCount > 0 && (
          <View style={styles.notification}>
            <Text style={styles.notificationText}>{cartCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 38,
    paddingLeft: 18,
    marginTop: 36,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#fff', // Nền màu trắng
    padding: 10,
    borderRadius: 5, // Để tạo bo góc mềm cho header
    shadowColor: '#000', // Màu của bóng đổ
    shadowOffset: { width: 0, height: 2 }, // Đặt vị trí bóng đổ
    shadowOpacity: 0.1, // Độ mờ của bóng đổ
    shadowRadius: 5, // Bán kính của bóng đổ
    elevation: 5, // Độ cao bóng đổ cho Android
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flexGrow: 1,
  },
  searchIcon: {
    color: '#888',
    fontSize: 20,
  },
  searchInput: {
    flexGrow: 1,
    borderWidth: 0,
    fontSize: 16,
    marginLeft: 10,
  },
  cartContainer: {
    position: 'relative',
    marginLeft: 10,
  },
  cartIcon: {
    fontSize: 20,
    color: '#333',
  },
  notification: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 50,
    padding: 2,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 12,
  },
});

export default Header;
