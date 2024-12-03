import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const ChooseRoleScreen = ({ navigation }) => {
  // State to track the selected role
  const [selectedRole, setSelectedRole] = useState(null);

  // Handle role selection
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn vai trò của bạn</Text>
      <Icon style={styles.arrow} name="arrow-down" size={30} color="#007AFF" />
      <View style={styles.roleContainer}>

        <TouchableOpacity
          style={[
            styles.role,
            styles.roleLeft,
            selectedRole === 'customer' && styles.selectedRole, // Apply highlight style if selected
          ]}
          onPress={() => handleRoleSelect('customer')}
        >
          <Image
            style={styles.image}
            source={
              require("../../assets/thumb/muasam.png")
            }
          />
          <Text style={styles.roleText}>Khách hàng mua sắm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.role,
            styles.roleRight,
            selectedRole === 'seller' && styles.selectedRole, // Apply highlight style if selected
          ]}
          onPress={() => handleRoleSelect('seller')}
        >
          <Image
            style={styles.image}
            source={{
              uri: 'https://agilearn.vn/wp-content/uploads/2021/02/ban-hang-chuyen-nghiep-02-1.png',
            }}
          />
          <Text style={styles.roleText}>Người bán hàng</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.getStarted} onPress={() => { navigation.navigate(selectedRole === "customer" ? "Login" : "SellerLogin") }}>
        <Text style={styles.getStartedText}>Bắt đầu ngay</Text>
        <Icon name="arrow-right" style={styles.getStartedIcon} size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 80,
  },
  title: {
    fontSize: 24,
    color: '#007AFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  arrow: {
    marginVertical: 20,
  },
  roleContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 360,
    width: '100%',
    position: 'relative',
  },
  role: {
    width: 260,
    height: 160,
    backgroundColor: '#FFFFFF',
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'absolute',
  },
  roleLeft: {
    top: 0,
    left: '17%',
  },
  roleRight: {
    bottom: 0,
    right: '17%',
  },
  image: {
    width: 120,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  roleText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
  },
  selectedRole: {
    backgroundColor: '#E0F7FF', // Background color when selected
    borderColor: '#009CDB', // Highlight border color
    borderWidth: 2, // Thicker border
    shadowColor: '#009CDB', // Optional shadow color to make it stand out
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6, // Elevate to give 3D effect
  },
  getStarted: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
  },
  getStartedText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
    fontWeight: 'bold',
  },
});


export default ChooseRoleScreen;
