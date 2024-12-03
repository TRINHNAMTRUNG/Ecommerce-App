import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import icon libraries

const AdminPage = ({ navigation }) => {
  // Hàm xử lý khi người dùng nhấn vào nút
  const handleProductPress = () => {
    navigation.navigate('createProduct');  // Điều hướng tới trang CreateProduct
  };
  const handleMarketingPress = () => {
    navigation.navigate('couponPage');  // Điều hướng tới trang couponPage
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Thêm logo Tiki */}
        <Image
          source={{ uri: 'https://tiki.vn/favicon.ico' }} 
          style={styles.logo}
        />
        <Text style={styles.headerText}>Trang Quản Trị</Text>
      </View>

      <Text style={styles.title}>Trang Chủ</Text>

      {/* Các Card với Icon */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.button} onPress={handleProductPress}>
          <MaterialIcons name="category" size={24} color="white" />
          <Text style={styles.buttonText}>Sản phẩm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.button} onPress={handleMarketingPress}>
          <FontAwesome name="bullhorn" size={24} color="white" />
          <Text style={styles.buttonText}>Trung tâm Marketing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  logo: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  card: {
    width: '100%',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 5, // Thêm bóng đổ mạnh hơn để tạo hiệu ứng nổi bật cho card
    shadowRadius: 8, // Mở rộng bán kính của bóng đổ
  },
  button: {
    backgroundColor: '#0A68FF', // Màu xanh Tiki (màu xanh dương sáng)
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#0083B0', // Màu viền đậm hơn để nổi bật
    opacity: 0.9, // Thêm hiệu ứng mờ khi không tương tác
    transition: 'background-color 0.3s ease', // Thêm hiệu ứng chuyển màu nền khi hover hoặc nhấn
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  buttonPressed: {
    backgroundColor: '#0083B0', // Đổi màu khi nhấn
  },
});

export default AdminPage;
