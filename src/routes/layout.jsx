
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainTabNavigator from "./mainTabNavigation";

const Layout = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <MainTabNavigator />
        </NavigationContainer>
    )
}

export default Layout;
