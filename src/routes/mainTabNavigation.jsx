import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFaceSmileWink as faFaceSmileWinkReg } from '@fortawesome/free-regular-svg-icons';
import { faFaceSmileWink as faFaceSmileWinkSol } from '@fortawesome/free-solid-svg-icons';
import { faHouseCrack, faHouse, faList, faListCheck, faEnvelope, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';  // Thêm icon mới

import { StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

import HomeStackScreen from "./homeStackScreen";
import UserStackScreen from "./userStackScreen";
import CategoryStackScreen from "./categoryStackScreen";
import CartStackScreen from "./cartStackScreen";

const MainTabNavigator = () => {
    const Tab = createBottomTabNavigator();
    const screenOptions = ({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#105EF3',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
            paddingBottom: 5,
            height: 50,
        },
        tabBarIcon: ({ color, focused }) => {
            let icon;
            if (route.name === 'HomeStack') {
                icon = focused ? faHouseCrack : faHouse;
            } else if (route.name === 'ActivityStack') {
                icon = focused ? faListCheck : faList;
            } else if (route.name === 'CartStack') {
                icon = focused ? faShoppingCart : faCartPlus;
            } else if (route.name === 'UserStack') {
                icon = focused ? faFaceSmileWinkSol : faFaceSmileWinkReg;
            }
            return <FontAwesomeIcon icon={icon} size={20} color={color} />;
        },
        tabBarButton: (props) => (
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.2)', true)}
                {...props}
            >
                <View style={styleTab.tab}>
                    {props.children}
                </View>
            </TouchableNativeFeedback>
        ),
    });

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="HomeStack"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={focused ? styleTab.labelFocus : styleTab.labelUnFocus}>
                            Trang chủ
                        </Text>
                    ),
                }}
            />
            <Tab.Screen
                name="ActivityStack"
                component={CategoryStackScreen}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={focused ? styleTab.labelFocus : styleTab.labelUnFocus}>
                            Danh mục
                        </Text>
                    ),
                }}
            />
            <Tab.Screen
                name="CartStack"
                component={CartStackScreen}
                options={{

                    tabBarLabel: ({ focused }) => (
                        <Text style={focused ? styleTab.labelFocus : styleTab.labelUnFocus}>
                            Giỏ hàng
                        </Text>
                    ),
                }}
            />
            <Tab.Screen
                name="UserStack"
                component={UserStackScreen}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={focused ? styleTab.labelFocus : styleTab.labelUnFocus}>
                            Tài khoản
                        </Text>
                    ),
                }}
            />


        </Tab.Navigator>
    );
}

const styleTab = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    labelFocus: {
        fontSize: 10,
        fontWeight: "700",
        color: "#105EF3",
    },
    labelUnFocus: {
        fontSize: 10,
        fontWeight: "normal",
        color: "gray",
    }
});

export default MainTabNavigator;
