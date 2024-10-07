import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

const Signup = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/banner.jpg')} style={styles.imgBanner} />
      <View style={styles.main}>
        <TouchableOpacity style={styles.btnUpfile}>
          <Image source={require('../../assets/img/image.png')} style={styles.LogoUpfile} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text>Name</Text>
        <TextInput style={styles.textInput} />
        <Text>Email</Text>
        <TextInput style={styles.textInput} />
        <Text>Phone Number</Text>
        <TextInput style={styles.textInput} />
        <Text>Password</Text>
        <TextInput style={styles.textInput} placeholder='Your password, at least 8 characters.' secureTextEntry />
        <Text>Confirm Password</Text>
        <TextInput style={styles.textInput} placeholder='Re-type your password' secureTextEntry />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  imgBanner: {
    width: '100%',
    height: 130,
    resizeMode: 'stretch',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnUpfile: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LogoUpfile: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  scrollContent: {
    padding: 20, // Thêm padding cho nội dung trong ScrollView
    flexGrow: 1, // Đảm bảo ScrollView có thể cuộn
    justifyContent: 'flex-start', // Đảm bảo nội dung bắt đầu từ trên
  },
  textInput: {
    borderBottomWidth: 0.8,
    marginBottom: 20, // Thêm khoảng cách giữa các TextInput
    height: 40, // Đặt chiều cao cho TextInput
  },
});

export default Signup;
