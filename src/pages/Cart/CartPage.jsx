import React, { memo, useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { getCartItems } from "../../services/cartService";
import { useSelector } from "react-redux";
import PromoComponentTotal from "../../components/Cart/promoTotal"; // Import your PromoComponentTotal
import FrameAddress from "../../components/Home/frameAddress";
import ShoppingCart from "../../components/Cart/shoppingCart";
import PriceDisplay from "../../components/Cart/priceDisplay";
import LoadingComponent from "../../components/loadComponent";
import { useFocusEffect } from '@react-navigation/native';

const CartPage = ({ navigation, route }) => {
  const productSelect = {};
  if (route.params && route.params.product) {
    productSelect = route.params.product;
  }
  const [cartItems, setCartItems] = useState([]);
  const dataUser = useSelector((state) => state.auth.user);
  const [subtotal, setSubtotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const totalQuantity = cartItems.reduce((a, b) => a + b.quantity, 0);
  useFocusEffect(
    useCallback(() => {
      fetchCartItems();
    }, [])
  )

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      const res = await getCartItems(dataUser._id);
      if (res.success && res.data) {
        const groupedBySeller = Object.values(
          res.data.listProduct.reduce((acc, item) => {
            const sellerId = item.product.seller._id;
            if (!acc[sellerId]) {
              acc[sellerId] = {
                sellerId: sellerId,
                nameStore: item.product.seller.nameStore,
                listProduct: [],
                checked: false
              };
            }
            acc[sellerId].listProduct.push({ ...item.product, itemsQty: item.itemsQty, checked: productSelect._id === item.product._id && productSelect ? true : false });
            return acc;
          }, {})
        );
        setCartItems(groupedBySeller);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingComponent message="Đang tải giỏ hàng, vui lòng chờ..." />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faXmark} size={16} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Giỏ hàng</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <View style={styles.scrollContainer}>
        {cartItems.length > 0 ?
          <FlatList
            style={[{ flex: 1 }]}
            data={[1]}
            renderItem={() => (
              <View>
                <FrameAddress />
                <ShoppingCart cartItems={cartItems} setSubtotal={setSubtotal} setCartItems={setCartItems} />
                <PriceDisplay subtotal={subtotal} discount={0} />
              </View>
            )}
            keyExtractor={() => "cartGrid"}
            showsVerticalScrollIndicator={false}
          />
          :
          <View style={styles.emptyCartContainer}>
            <Image
              source={{
                uri: 'https://storage.googleapis.com/a1aa/image/wvPYdsPQzmZ6CZGywZUZCHej0meQ7nJsuFpseEt9iKie4JJPB.jpg',
              }}
              style={styles.image}
            />
            <View>
              <Text style={styles.title}>Giỏ hàng trống</Text>
              <Text style={styles.subtitle}>
                Vui lòng thêm sản phẩm!
              </Text>
            </View>
          </View>
        }
      </View>

      {cartItems.length > 0 &&
        <View style={styles.fixedPromoContainer}>
          <PromoComponentTotal
            subtotal={subtotal}
            quantity={totalQuantity}
            navigation={navigation}
            cartItems={cartItems}
          />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#4A4A4A',
  },
  emptyCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default memo(CartPage);
