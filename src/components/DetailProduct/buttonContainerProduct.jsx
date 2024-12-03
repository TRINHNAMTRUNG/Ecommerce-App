import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSelector } from "react-redux"; // Lấy thông tin user từ Redux
import { addProductToCart } from "../../services/cartService"; // Dịch vụ thêm sản phẩm vào giỏ hàng

const ButtonContainer = ({ product, navigation }) => {
  const customer = useSelector((state) => state.auth.user); // Lấy user từ Redux
  const handleAddToCart = async () => {
    // Kiểm tra nếu người dùng chưa đăng nhập
    if (!customer || !customer._id) {
      Alert.alert("Lỗi", "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }
    try {
      // Chuẩn bị dữ liệu để gửi lên server
      const data = {
        customer: customer._id, // Chỉ cần truyền _id của customer
        product: product._id,
        itemsQty: 1,
      };

      // Gọi API để thêm sản phẩm vào giỏ hàng
      const response = await addProductToCart(data);

      // Kiểm tra phản hồi từ server
      if (response && response.success) {
        console.log("Thêm vào giỏ thành công:", response);
        Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng!");
        navigation.navigate("cartPage");
      } else {
        const message = response?.message || "Thêm sản phẩm thất bại.";
        Alert.alert("Lỗi", message);
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.mainButton}>
        <Text style={styles.buttonText}>Mua ngay không cần đăng nhập</Text>
      </TouchableOpacity>
      <View style={styles.secondaryButtons}>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleAddToCart}>
          <Text style={styles.buttonTextCard}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
    marginBottom: 10,
  },
  mainButton: {
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
    maxWidth: 350,
  },
  secondaryButtons: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 360,
  },
  secondaryButton: {
    backgroundColor: "white",
    borderColor: "#007bff",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextCard: {
    color: "blue",
    fontSize: 16,
  },
});

export default ButtonContainer;
