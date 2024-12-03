import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

const InfoDetail = ({ product }) => {
  const [collapsed, setCollapsed] = useState(true);

  // Dữ liệu thông tin
  // const infoData = [
  //   { header: 'Cung cấp bởi', value: 'Tiki Trading' },
  //   { header: 'Thương hiệu', value: <Text style={styles.link} onPress={() => Linking.openURL('https://example.com')}>Gilaa</Text> },
  //   { header: 'Xuất xứ thương hiệu', value: 'Hàn Quốc' },
  //   { header: 'Xuất xứ (Made in)', value: 'Hàn Quốc' },
  //   { header: 'Hạn sử dụng', value: '24 tháng kể từ ngày sản xuất' },
  //   { header: 'Sản phẩm có được bảo hành không?', value: 'Không' },
  // ];
  const infoData = product.attribute;

  // Hàm xử lý nhấn nút thu gọn/mở rộng
  const handleCollapseClick = () => {
    setCollapsed(!collapsed);
  };

  // Số lượng thông tin hiển thị khi thu gọn
  const visibleCount = 4;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin chi tiết</Text>
      <View style={styles.table}>
        {infoData.slice(0, collapsed ? visibleCount : infoData.length).map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cellHeader}>{item.name}</Text>
            <Text style={styles.cell}>{item.value}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={handleCollapseClick} style={styles.collapseLink}>
        <Text style={styles.collapseLinkText}>{collapsed ? 'Hiển thị tất cả' : 'Thu Gọn'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 1,
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cellHeader: {
    color: '#666666',
    fontWeight: 'bold',
    flex: 1,

  },
  cell: {
    color: '#333333',
    flex: 2,
    marginLeft: 20
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  collapseLink: {
    marginTop: 20,
  },
  collapseLinkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    color: '#ffffff',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonIcon: {
    color: '#ffffff',
    fontSize: 24,
  },
});

export default InfoDetail;
