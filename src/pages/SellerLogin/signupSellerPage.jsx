import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Thêm thư viện icon

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('Việt Nam');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('');
  const [storeName, setStoreName] = useState('');
  const [nameOwner, setNameOwner] = useState('');
  const [address, setAddress] = useState([{ city: '', district: '', ward: '', addressLine: '', status: true }]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Thêm state cho xác nhận mật khẩu
  const [showPassword, setShowPassword] = useState(false); // Hiển thị/ẩn mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Hiển thị/ẩn xác nhận mật khẩu
  const [showCountryModal, setShowCountryModal] = useState(false);

  const countries = [
    { name: 'Việt Nam', flagUri: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg' },
    { name: 'Trung Quốc', flagUri: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_the_People%27s_Republic_of_China.svg' },
    { name: 'Đài Loan', flagUri: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Taiwan.svg' },
    { name: 'Singapore', flagUri: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg' },
    { name: 'Hàn Quốc', flagUri: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_South_Korea.svg' },
  ];

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert('Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }
    console.log('Email:', email);
    console.log('Name:', name);
    console.log('Country:', country);
    console.log('Phone:', phone);
    console.log('Industry:', industry);
    console.log('Store Name:', storeName);
    console.log('Name Owner:', nameOwner);
    console.log('Address:', address);
    console.log('Password:', password);
  };

  const formData = [
    { label: 'Địa chỉ email', value: email, onChange: setEmail, placeholder: 'Nhập địa chỉ email', keyboardType: 'email-address' },
    { label: 'Họ và tên', value: name, onChange: setName, placeholder: 'Điền họ và tên như trên giấy tờ tùy thân.' },
    { label: 'Quốc gia', value: country, onChange: setCountry, placeholder: 'Chọn quốc gia', editable: false },
    { label: 'Số điện thoại', value: phone, onChange: setPhone, placeholder: 'Nhập số điện thoại', keyboardType: 'phone-pad' },
    { label: 'Ngành nghề', value: industry, onChange: setIndustry, placeholder: 'Nhập ngành nghề' },
    { label: 'Tên cửa hàng', value: storeName, onChange: setStoreName, placeholder: 'Nhập tên cửa hàng' },
    { label: 'Tên chủ cửa hàng', value: nameOwner, onChange: setNameOwner, placeholder: 'Nhập tên chủ cửa hàng' },
    { label: 'Địa chỉ', value: address[0].addressLine, onChange: (text) => setAddress([{ ...address[0], addressLine: text }]), placeholder: 'Nhập địa chỉ của cửa hàng' },
    { label: 'Mật khẩu', value: password, onChange: setPassword, placeholder: 'Nhập mật khẩu', secureTextEntry: !showPassword },
    { label: 'Xác nhận mật khẩu', value: confirmPassword, onChange: setConfirmPassword, placeholder: 'Xác nhận mật khẩu', secureTextEntry: !showConfirmPassword },
  ];

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>
        Đăng ký bán hàng cùng <Text style={styles.tikiText}>TIKI</Text>
      </Text>

      {/* Quốc gia Modal */}
      <Modal visible={showCountryModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn quốc gia</Text>
            {countries.map((countryItem, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.modalOption}
                onPress={() => {
                  setCountry(countryItem.name);
                  setShowCountryModal(false);
                }}
              >
                <Image source={{ uri: countryItem.flagUri }} style={styles.flag} />
                <Text style={styles.countryName}>{countryItem.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCountryModal(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://salt.tikicdn.com/cache/w680/ts/user/dc/e6/b4/fa5101071b365ee2f385fd7d208b309f.jpg' }}
          style={styles.image}
        />
      </View>

      {/* Render form inputs */}
      {formData.map((item, index) => (
        <View key={index} style={styles.formGroup}>
          <Text style={styles.label}>{item.label}</Text>
          {item.label === 'Quốc gia' ? (
            <TouchableOpacity onPress={() => setShowCountryModal(true)} style={styles.input}>
              <Text style={styles.inputText}>{country}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={item.placeholder}
                keyboardType={item.keyboardType}
                secureTextEntry={item.secureTextEntry}
                value={item.value}
                onChangeText={item.onChange}
                editable={item.editable !== false}
              />
              {item.label === 'Mật khẩu' || item.label === 'Xác nhận mật khẩu' ? (
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => {
                    if (item.label === 'Mật khẩu') {
                      setShowPassword(!showPassword);
                    } else {
                      setShowConfirmPassword(!showConfirmPassword);
                    }
                  }}
                >
                  <Icon name={item.label === 'Mật khẩu' ? (showPassword ? 'eye-off' : 'eye') : (showConfirmPassword ? 'eye-off' : 'eye')} size={24} color="#aaa" />
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Đăng ký</Text>
      </TouchableOpacity>

      <View style={styles.loginLink}>
        <Text>Đã có tài khoản? <Text style={styles.loginLinkText}>Đăng nhập</Text></Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  tikiText: {
    color: '#007bff',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 350,
    height: 250,
    borderRadius: 10,
  },
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  submitButton: {
    padding: 14,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginBottom: 80,
    marginTop: 10,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  countryName: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SignUpForm;
