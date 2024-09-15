import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const InfoSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name="info" size={20} color="white" />
      </View>
      <Text style={styles.text}>
        Xem thêm <Text style={styles.link}>Ưu điểm & lưu ý của sản phẩm</Text>
      </Text>
      <View style={styles.arrow}>
        <Icon name="chevron-right" size={16} color="#333" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: '#007bff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  text: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
  },
  arrow: {
    marginLeft: 'auto',
  },
});

export default InfoSection;
