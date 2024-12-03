import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet, Button, Linking, AppState } from 'react-native';
import { confirmTransaction, postPayment } from '../../services/paymentService';
import { useModal } from '../../components/modelDialog';
import { useSelector } from "react-redux"
const PaymentMethods = ({ navigation, route }) => {
  const items = route?.params?.items || [];
  const subtotal = route?.params?.subtotal || 0;
  const user = useSelector((state) => state.auth.user);
  // console.log("ITEMS CHO HOA DON =>>>>>>>>:         ", items);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [orderId, setOrderId] = useState("");
  const [hasCheckedPayment, setHasCheckedPayment] = useState(false);
  const { openModal } = useModal();
  const methods = [
    { id: 1, name: 'Tiền mặt khi nhận hàng', icon: '💵' },
    { id: 2, name: 'Momo', icon: '📱', category: 'Ví điện tử' },
    { id: 3, name: 'VNPAY', icon: '🏦' },
    { id: 4, name: 'Thẻ ATM (Internet Banking)', icon: '💳' },
  ];

  const checkPaymentStatus = async (dataPayment) => {
    try {
      const result = await confirmTransaction(dataPayment);
      console.log(dataPayment.orderId);
      if (result.data?.resultCode === 0 && result.success === true) {
        openModal('Thanh toán thành công!', 'success');
        navigation.navigate("home");
      } else {
        openModal('Thanh toán thất bại!', 'error');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      openModal('Thanh toán thất bại!', 'error');
    }
  };

  useEffect(() => {
    // Lắng nghe sự thay đổi của trạng thái ứng dụng
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active' && !hasCheckedPayment) {
        // Khi ứng dụng quay lại từ nền hoặc background
        console.log("Comback");
        const { phoneNumber, email, customerName: name, address, _id: id } = user;
        const { city, district, ward, addressLine } = address;
        const strAddress = `${addressLine} phường ${ward} ${district} ${city}`
        const dataPayment = {
          items,
          userInfo: { phoneNumber, email, name, address: strAddress, id },
          amount: subtotal,
          orderId
        };
        checkPaymentStatus(dataPayment);
        setHasCheckedPayment(true);
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState, orderId, hasCheckedPayment]);

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleAcceptPayment = async () => {
    try {
      const { phoneNumber, email, customerName: name } = user;
      const dataPayment = {
        items,
        userInfo: { phoneNumber, email, name },
        amount: subtotal,
      };
      const result = await postPayment(dataPayment);
      console.log("Appppppppppp          ", dataPayment);
      const supported = await Linking.canOpenURL(result.data.payUrl);

      if (supported) {
        setOrderId(result.data.orderId);
        setIsModalVisible(false);
        await Linking.openURL(result.data.payUrl);
      } else {
        openModal('Không thể mở liên kết thanh toán!', 'error');
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      openModal('Có lỗi xảy ra khi mở liên kết thanh toán!', 'error');
    }
  };

  const handleConfirm = () => {
    setIsModalVisible(true);
  };

  const renderMethod = (method) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.method,
        selectedMethod?.id === method.id && styles.selectedMethod,
      ]}
      onPress={() => handleSelect(method)}
    >
      <Text style={styles.icon}>{method.icon}</Text>
      <Text style={styles.methodText}>{method.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Xác nhận thanh toán</Text>
            <Text style={styles.modalTitle}>
              {selectedMethod
                ? `Bạn có chắc muốn thanh toán bằng phương thức "${selectedMethod.name}" không?`
                : 'Vui lòng chọn phương thức thanh toán.'}
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="Hủy"
                onPress={() => setIsModalVisible(false)}
              />
              <Button
                title="Đồng ý"
                onPress={() => handleAcceptPayment()}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Text style={styles.title}>Chọn Phương Thức Thanh Toán</Text>
      <ScrollView>
        {methods.map((method) => renderMethod(method))}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          !selectedMethod && styles.disabledButton,
        ]}
        onPress={() => handleConfirm()}
        disabled={!selectedMethod}
      >
        <Text style={styles.buttonText}>Xác Nhận Thanh Toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  method: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedMethod: {
    borderColor: '#007BFF',
    backgroundColor: '#E6F0FF',
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  methodText: {
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default PaymentMethods;

