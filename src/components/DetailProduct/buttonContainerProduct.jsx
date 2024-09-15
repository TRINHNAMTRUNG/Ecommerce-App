import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ButtonContainer = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.mainButton}>
        <Text style={styles.buttonText}>Mua ngay không cần đăng nhập</Text>
      </TouchableOpacity>
      <View style={styles.secondaryButtons}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.buttonTextCard}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  mainButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%', 
    maxWidth: 350,
  },
  secondaryButtons: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 360, 
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    flex: 1, 
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white', 
    fontSize: 16,
    fontWeight: '600'
  },
  buttonTextCard: {
    color: 'blue', 
    fontSize: 16,
  },
});

export default ButtonContainer;
