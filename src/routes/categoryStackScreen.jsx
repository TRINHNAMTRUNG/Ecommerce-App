import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoryPage from "../pages/Category/CategoryPage";


const CategoryStack = createNativeStackNavigator();

const CategoryStackScreen = () => {

    return (
        <CategoryStack.Navigator initialRouteName="categoryPage" screenOptions={{ headerShown: false }} >

            <CategoryStack.Screen name="categoryPage" component={CategoryPage} />
        </CategoryStack.Navigator>
    );
}

export default CategoryStackScreen;