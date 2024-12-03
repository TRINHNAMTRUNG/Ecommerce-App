import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartPage from '../pages/Cart/CartPage';
import PromoPage from '../pages/Promo/promoPage'
import PaymentMethods from "../pages/Invoice/invoicePage";

const CartStack = createNativeStackNavigator();

const CartStackScreen = () => {

    return (
        <CartStack.Navigator initialRouteName="cartPage" screenOptions={{ headerShown: false }}>
            <CartStack.Screen name="cartPage" component={CartPage} />
            <CartStack.Screen name="promoPage" component={PromoPage} />
            <CartStack.Screen name="paymentMethods" component={PaymentMethods} />
        </CartStack.Navigator>
    )
}

export default CartStackScreen;