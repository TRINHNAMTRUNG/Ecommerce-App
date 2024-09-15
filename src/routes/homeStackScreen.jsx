import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "../pages/Home/homePage.jsx";
import HomeDetail from "../pages/Home/homeDetail.jsx";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {

    return (
        <HomeStack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }} >
            <HomeStack.Screen name="home" component={HomePage} />
            <HomeStack.Screen name="homeDetail" component={HomeDetail} />
        </HomeStack.Navigator>
    );
}

export default HomeStackScreen;