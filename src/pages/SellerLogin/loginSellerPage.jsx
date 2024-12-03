import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const SellerLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Image
          source={{
            uri: 'https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/354432301_639806621512870_3778338217640432870_n.png?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE5SezkhdDzcmLIIZLdVftT_QNcaPGcfD_9A1xo8Zx8P_zYjXARuaznss8Cqr7sIOvusI3w1qx3QqFWgDU59a8q&_nc_ohc=cGJHOWQ9srYQ7kNvgGudNdj&_nc_zt=23&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=AVu_nv7OtQQges8HXo8-GOv&oh=00_AYBkBsDdKCBqlJzTVhBdSz863VcY72CEqcPMUtSOu1WcYQ&oe=6744F3CB',
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Đăng nhập</Text>
        <Text style={styles.subtitle}>
          Bạn chưa có tài khoản?{' '}
          <Text style={styles.link} onPress={() => alert('Đăng ký')}>
            Đăng ký
          </Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập Email hoặc Số điện thoại"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <FontAwesome
              name={passwordVisible ? 'eye-slash' : 'eye'}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          Quên mật khẩu? nhấn vào{' '}
          <Text style={styles.link} onPress={() => alert('Quên mật khẩu')}>
            đây
          </Text>
        </Text>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>Hoặc, đăng nhập bằng</Text>
        <View style={styles.socialLogin}>
          <TouchableOpacity
            style={[styles.socialButton, styles.facebook]}
            onPress={() => alert('Login with Facebook')}
          >
            <FontAwesome name="facebook-f" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, styles.google]}
            onPress={() => alert('Login with Google')}
          >
            <FontAwesome name="google" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, styles.apple]}
            onPress={() => alert('Login with Apple')}
          >
            <FontAwesome5 name="apple" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b3e5fc',
  },
  loginContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  loginButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#ffeb3b',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  socialButton: {
    width: 45,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebook: {
    backgroundColor: '#3b5998',
  },
  google: {
    backgroundColor: '#db4437',
    marginLeft: 10,
    marginRight: 10,
  },
  apple: {
    backgroundColor: '#000000',
  },
});

export default SellerLogin;
