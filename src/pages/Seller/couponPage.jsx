import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Switch, Image } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreatePromoCode = ({navigation}) => {
  const [formData, setFormData] = useState({
    code: '',
    discountValue: '',
    endDate: new Date(),
    applicableProducts: [],
    usageLimit: '',
    minOrderValue: '',
    active: true, // Trạng thái khuyến mãi
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        alert('Không thể tải danh sách sản phẩm!');
      }
    };
    fetchProducts();
  }, []);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProductSelection = (productId) => {
    setFormData((prev) => ({
      ...prev,
      applicableProducts: prev.applicableProducts.includes(productId)
        ? prev.applicableProducts.filter((id) => id !== productId)
        : [...prev.applicableProducts, productId],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formattedData = {
        ...formData,
        discountValue: parseFloat(formData.discountValue),
        usageLimit: parseInt(formData.usageLimit, 10),
        minOrderValue: parseFloat(formData.minOrderValue),
        endDate: formData.endDate.toISOString(),
      };

      const response = await axios.post('/api/promotions', formattedData);
      if (response.status === 200) {
        alert('Mã khuyến mãi đã được tạo thành công!');
        setFormData({
          code: '',
          discountValue: '',
          endDate: new Date(),
          applicableProducts: [],
          usageLimit: '',
          minOrderValue: '',
          active: true, // Reset trạng thái active
        });
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi tạo mã khuyến mãi!');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleFieldChange('endDate', selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image
        source={{ uri: 'https://salt.tikicdn.com/ts/SellerCenter/a8/77/22/70afa8081f795da2ed1a7efefc3f0579.png' }}
        style={styles.logo}
      />

      <Text style={styles.title}>Tạo Mã Khuyến Mãi Mới</Text>

      <TextInput
        style={styles.input}
        placeholder="Mã khuyến mãi"
        value={formData.code}
        onChangeText={(value) => handleFieldChange('code', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Giá trị giảm giá"
        value={formData.discountValue}
        onChangeText={(value) => handleFieldChange('discountValue', value)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Ngày hết hạn</Text>
      <Button title="Chọn ngày" onPress={() => setShowDatePicker(true)} />
      <Text style={styles.selectedDate}>
        {formData.endDate.toLocaleDateString('vi-VN')}
      </Text>
      {showDatePicker && (
        <DateTimePicker
          value={formData.endDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Chọn sản phẩm áp dụng</Text>
      <View style={styles.productContainer}>
        {products.map((product) => (
          <View key={product._id} style={styles.productRow}>
            <Switch
              value={formData.applicableProducts.includes(product._id)}
              onValueChange={() => handleProductSelection(product._id)}
            />
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            <Text style={styles.productText}>{product.name}</Text>
          </View>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Giới hạn sử dụng"
        value={formData.usageLimit}
        onChangeText={(value) => handleFieldChange('usageLimit', value)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Giá trị đơn hàng tối thiểu"
        value={formData.minOrderValue}
        onChangeText={(value) => handleFieldChange('minOrderValue', value)}
        keyboardType="numeric"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Kích hoạt</Text>
        <Switch
          value={formData.active}
          onValueChange={() => handleFieldChange('active', !formData.active)}
        />
      </View>

      <Button
        title={loading ? 'Đang tạo...' : 'Tạo mã khuyến mãi'}
        onPress={handleSubmit}
        disabled={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    paddingTop: 50,
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
  },
  selectedDate: {
    marginTop: 8,
    fontSize: 16,
    color: '#007BFF',
  },
  productContainer: {
    marginBottom: 16,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  productText: {
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default CreatePromoCode;
