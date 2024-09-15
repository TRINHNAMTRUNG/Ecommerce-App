import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Đảm bảo bạn đã cài đặt thư viện này

const ShoppingAssurance = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>An tâm mua sắm</Text>
      <View style={styles.item}>
        <Icon name="save" style={styles.icon} />
        <Text style={styles.text}>Được đồng kiểm khi nhận hàng</Text>
      </View>
      <View style={styles.item}>
        <Icon name="undo" style={styles.icon} />
        <Text style={styles.text}>Được hoàn tiền <Text style={styles.bold}>200%</Text> nếu là hàng giả.</Text>
      </View>
      <View style={styles.item}>
        <Icon name="inbox" style={styles.icon} />
        <Text style={styles.text}>
          Đổi trả miễn phí trong 30 ngày. Được đổi ý.
          
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com')}>
            <Text style={styles.link}>Chi tiết</Text>
        </TouchableOpacity>
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1, 
    paddingVertical: 10,
    borderBottomColor: '#ddd', 
  },
  icon: {
    fontSize: 24, // Điều chỉnh kích thước biểu tượng nếu cần
    color: '#0066ff',
    marginRight: 10,
  },
  text: {
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: '#0066ff',
    textDecorationLine: 'underline',
    paddingLeft:  5,

  },
});

export default ShoppingAssurance;
