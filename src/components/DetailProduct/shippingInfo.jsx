import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import catg4 from '../../assets/listCatg/catg4.png';
const ShippingInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.header}>Thông tin vận chuyển</Text>
        <View style={styles.address}>
          <Text>Giao đến Q. Bình Thạnh, P. 12, Hồ Chí Minh</Text>
          <TouchableOpacity>
            <Text style={styles.changeLink}>Đổi</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.deliveryOption}>
        <Text style={styles.now}>NOW Giao siêu tốc 2h</Text>
        <View style={styles.time}>
          <Text>Trước 13h hôm nay:</Text>
          <Text style={styles.free}>Miễn phí</Text>
          <Text style={styles.oldPrice}>25.000đ</Text>
        </View>
      </View>

      <View style={styles.deliveryOption}>
        <View style={styles.containerShip}>
          {/* <Image source={catg4} style={styles.badgeIcon} /> */}
          <Text style={styles.now}>Giao đúng sáng mai</Text>
        </View>

        <View style={styles.time}>
          <Text>8h - 12h, 15/09:</Text>
          <Text style={styles.free}>Miễn phí</Text>
          <Text style={styles.oldPrice}>16.500đ</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    flexDirection: 'column',
    marginBottom: 10,
  },
  containerText: {
    width: '100%',
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: '#ddd',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  address: {
    color: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  changeLink: {
    color: '#0066ff',
    textDecorationLine: 'underline',
    fontSize: 14,
    marginLeft: 5,
  },
  deliveryOption: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: '#ddd',
  },
  now: {
    color: 'red',
    fontWeight: 'bold',
    paddingBottom: 6
  },

  containerShip: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  badgeIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  shippingText: {
    fontSize: 16, // Kích thước chữ
    color: '#333', // Màu chữ
  },
  time: {
    color: '#333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  free: {
    color: 'green',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    marginLeft: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default ShippingInfo;
