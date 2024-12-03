// ProfileInfo.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogout } from '../../store/Action/authAction.js';

const ProfileInfo = ({ navigation }) => {
  const dataUser = useSelector((state) => state.auth.user);

  const profileData = [
    { icon: 'user', label: 'Họ & Tên', value: dataUser.customerName, placeholder: "Nhập họ tên", key: "customerName" },
    { icon: 'phone', label: 'Quốc tịch', value: dataUser.nationality, placeholder: "Nhập quốc tịch", key: "nationality" },
    { icon: 'envelope', label: 'Địa chỉ email', value: dataUser.email, placeholder: "Nhập địa chỉ email", key: "email" },
    { icon: 'venus-mars', label: 'NickName', value: dataUser.nickName ? dataUser.nickName : "", key: "nickName" },
    { icon: 'calendar-alt', label: 'Ngày sinh', value: dataUser.birthDate ? dataUser.birthDate : "", placeholder: "Chọn ngày sinh", key: "birthDate" },
    { icon: 'lock', label: 'Đổi mật khẩu', value: '', onPress: () => navigation.navigate("changePassword") },
  ];

  const dispatch = useDispatch();
  const handleLogOut = () => {
    console.log("Bo m Log Out")
    dispatch(actionLogout());
  }

  return (
    <View style={styles.container}>
      {profileData.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => navigation.navigate("setting", { dataField: item })}
        >
          <FontAwesome5 name={item.icon} size={20} color="#888" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>{item.label}</Text>
            {item.value ? <Text style={styles.value}>{item.value}</Text> : null}
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#888" style={styles.arrow} />
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.mainButton} onPress={() => handleLogOut()}>
        <Text style={styles.buttonText} >Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: "white"
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#888',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    marginLeft: 10,
  },
  mainButton: {
    backgroundColor: '#0072FF',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 60,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
});

export default ProfileInfo;
