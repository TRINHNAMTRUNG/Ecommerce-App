import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getListRootCategory } from '../../services/categoryService'; // Giữ lại để lấy danh mục
import axios from 'axios';

const CreateProduct = ({navigation}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [warrantyDuration, setWarrantyDuration] = useState('');
  const [warrantyForm, setWarrantyForm] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getListRootCategory();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error) {
        alert('Failed to fetch categories!');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (category) {
      const selectedCategory = categories.find((cat) => cat.id === category);
      setSubCategories(selectedCategory ? selectedCategory.children : []);
    }
  }, [category, categories]);

  const handleSubmit = async () => {
    setLoading(true);
    const productData = {
      name,
      description,
      price,
      category,
      subCategory,
      warranty: {
        duration: warrantyDuration,
        form: warrantyForm,
      },
    };

    try {
      const response = await axios.post('http://your-api-url/api/products', productData);
      if (response.status === 200) {
        alert('Sản phẩm đã được tạo thành công!');
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setSubCategory('');
        setWarrantyDuration('');
        setWarrantyForm('');
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi tạo sản phẩm!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tạo Sản Phẩm Mới</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên sản phẩm"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.textarea}
        placeholder="Mô tả sản phẩm"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Giá sản phẩm"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Chọn danh mục" value="" />
        {categories.map((categoryItem) => (
          <Picker.Item key={categoryItem.id} label={categoryItem.name} value={categoryItem.id} />
        ))}
      </Picker>

      {subCategories.length > 0 && (
        <Picker
          selectedValue={subCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSubCategory(itemValue)}
        >
          <Picker.Item label="Chọn danh mục con" value="" />
          {subCategories.map((subCategoryItem) => (
            <Picker.Item key={subCategoryItem.id} label={subCategoryItem.name} value={subCategoryItem.id} />
          ))}
        </Picker>
      )}

      <TextInput
        style={styles.input}
        placeholder="Thời gian bảo hành (tháng)"
        value={warrantyDuration}
        onChangeText={setWarrantyDuration}
        keyboardType="numeric"
      />

      <Picker
        selectedValue={warrantyForm}
        style={styles.picker}
        onValueChange={(itemValue) => setWarrantyForm(itemValue)}
      >
        <Picker.Item label="Hình thức bảo hành" value="" />
        <Picker.Item label="Hóa đơn" value="invoice" />
        <Picker.Item label="Phiếu bảo hành" value="warrantyCard" />
        <Picker.Item label="Tem bảo hành" value="warrantySticker" />
        <Picker.Item label="Điện tử" value="electronic" />
      </Picker>

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.loadingButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitText}>
          {loading ? 'Đang tạo...' : 'Tạo sản phẩm'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  textarea: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    borderRadius: 30,
    paddingVertical: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  loadingButton: {
    backgroundColor: '#007BFF',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateProduct;
