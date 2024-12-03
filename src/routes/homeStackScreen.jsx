import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "../pages/Home/homePage.jsx";
import DetailProductPage from "../pages/DetailProduct/DetailProductPage.jsx";

// const screenHome = "home";
// const screenHome = "homeDetail";
// const screenproductDetail= "productDetail";
// const screenCartPage = "cartPage";
// const screenPromoPage = "promoPage";
// const screenSearchPage = "searchPage";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {

    return (
        <HomeStack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }} >

            <HomeStack.Screen name="home" component={HomePage} />
            <HomeStack.Screen name="productDetail" component={DetailProductPage} />
        </HomeStack.Navigator>
    );
}

export default HomeStackScreen;