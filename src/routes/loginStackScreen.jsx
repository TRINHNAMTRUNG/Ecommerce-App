import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/Login/loginPage.jsx";
import Register from "../pages/Login/registerPage.jsx";
import OtpPage from "../pages/Login/otpPage.jsx";
import SellerLogin from "../pages/SellerLogin/loginSellerPage.jsx";
import SignUpForm from "../pages/SellerLogin/signupSellerPage.jsx";
import ChooseRoleScreen from "../pages/RoleSelection/roleSelection.jsx";

const Stack = createNativeStackNavigator();

const LoginStackScreen = () => {

    return (
        <Stack.Navigator initialRouteName="ChooseRoleScreen" screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="SellerLogin" component={SellerLogin} />
            <Stack.Screen name="SellerRegister" component={SignUpForm} />
            <Stack.Screen name="OtpPage" component={OtpPage} />
            <Stack.Screen name="ChooseRoleScreen" component={ChooseRoleScreen} />
        </Stack.Navigator>
    );
}

export default LoginStackScreen;