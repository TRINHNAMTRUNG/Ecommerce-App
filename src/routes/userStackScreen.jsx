import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserPage from "../pages/User/userPage";

const UserStackScreen = () => {
    const StackUser = createNativeStackNavigator();
    return (
        <StackUser.Navigator initialRouteName="user" screenOptions={{ headerShown: false }}>
            <StackUser.Screen name="user" component={UserPage} />
            <StackUser.Screen name="setting" component={UserPage} />
        </StackUser.Navigator>
    )
}

export default UserStackScreen;