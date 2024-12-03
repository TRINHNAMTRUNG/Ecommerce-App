import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InforPage from "../pages/Profile/InforPage";
import EditInforPage from "../pages/Profile/EditInforPage";
import ChangePasswordPage from "../pages/ChangePassword/ChangePasswordPage"; // Import màn hình đổi mật khẩu

const UserStackScreen = () => {
    const StackUser = createNativeStackNavigator();
    return (
        <StackUser.Navigator initialRouteName="user" screenOptions={{ headerShown: false }}>
            <StackUser.Screen name="user" component={InforPage} />
            <StackUser.Screen name="setting" component={EditInforPage} />
            <StackUser.Screen name="changePassword" component={ChangePasswordPage} />
        </StackUser.Navigator>
    )
}

export default UserStackScreen;
