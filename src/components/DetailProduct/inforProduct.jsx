import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import catg4 from '../../assets/listCatg/catg4.png';

const InforProduct = () => {
  return (
    <View style={styles.container}>

        <View style={styles.badges}>
          <View style={[styles.badge, styles.freeship]}>
            <Image source={catg4} style={styles.badgeIcon} />
            <Text style={styles.badgeText}>FREESHIP XTRA</Text>
          </View>
          <View style={[styles.badge, styles.return]}>
            <Image source={catg4} style={styles.badgeIcon} />
            <Text style={styles.badgeText}>30 NGÀY ĐỔI TRẢ</Text>
          </View>
          <View style={[styles.badge, styles.authentic]}>
            <Image source={catg4} style={styles.badgeIcon} />
            <Text style={styles.badgeText}>CHÍNH HÃNG</Text>
          </View>
        </View>

        <View style={styles.productDetails}>
          <Text style={styles.author}>
            Tác giả: <Text style={styles.authorLink}>Thich Nhat Hanh</Text>
          </Text>
          <Text style={styles.title}>Fear Sợ Hãi – Hóa Giải Sợ Hãi Bằng Tình Thương</Text>
        </View>

        <View style={styles.productPrice}>
          <Text style={styles.price}>92.650₫</Text>
          <View style={styles.priceDetails}>
            <Text style={styles.originalPrice}>109.000₫</Text>
            <Text style={styles.discount}>-15%</Text>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 8,
    flexDirection: 'column',
  },
  badges: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: 10,
    marginRight: 10,
    
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    margin: 2,
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: 116
  },
  badgeIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  freeship: {
    backgroundColor: '#00bfa5',
    color: 'white',
  },
  return: {
    backgroundColor: '#ffe500',
    color: 'black',
  },
  authentic: {
    backgroundColor: '#0052cc',
    color: 'white',
  },
  productDetails: {
    marginBottom: 15,
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  authorLink: {
    color: '#007bff',
  },
  title: {
    fontSize: 16,
    fontWeight: '300',
    marginVertical: 5,
  },
  productPrice: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red'
  },
  priceDetails: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    marginRight: 5, 
  },
  discount: {
    fontSize: 16,
    color: 'red',
  },
});

export default InforProduct;
