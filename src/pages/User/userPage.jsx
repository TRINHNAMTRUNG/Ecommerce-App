import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";

import image from "../../assets/thumb/backgr_image.png";
import { faFaceSmileWink } from '@fortawesome/free-regular-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'react-native-elements';

const UserPage = () => {
    const fontSizeIcon = 20;
    const isImage = false;
    const countMessage = <FontAwesomeIcon icon={faPen} size={10} color="black" />;
    return (
        <View style={styleUserPage.bounary}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView>
                <View style={styleUserPage.headBar}>
                    <Text style={styleUserPage.leftTitle}>Tài khoản</Text>
                    <View style={styleUserPage.rightBar}>
                        <TouchableOpacity style={styleUserPage.btnBar}>
                            <FontAwesomeIcon icon={faGear} size={fontSizeIcon} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styleUserPage.btnBar}>
                            <FontAwesomeIcon icon={faShoppingCart} size={fontSizeIcon} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styleUserPage.containerUserPage}>
                    <View style={styleUserPage.frameInfomation}>
                        <View style={styleUserPage.wrapAvatar}>
                            <View style={styleUserPage.frameAvatar}>
                                {isImage ?
                                    <Image source={require = image} style={styleCardProduct.imageAvatar} />
                                    :
                                    <FontAwesomeIcon icon={faFaceSmileWink} size={30} color="gray" />
                                }
                            </View>
                            <Badge
                                value={countMessage}
                                containerStyle={{ position: 'absolute', right: 10, bottom: 0 }}
                                badgeStyle={{ backgroundColor: "#bdbcbc", height: 28, width: 28, borderRadius: 14, borderWidth: 2, borderColor: "white" }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>

    )
}

const styleUserPage = StyleSheet.create({
    bounary: {
        paddingHorizontal: 16
    },
    containerUserPage: {
        height: "100%",
        width: "100%",
    },
    headBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50,
        position: "relative",
        top: 0
    },
    leftTitle: {
        fontSize: 16,
        fontWeight: "500"
    },
    rightBar: {
        flexDirection: "row",
        alignItems: "center",
    },
    btnBar: {
        height: 50,
        paddingHorizontal: 12,
        justifyContent: "center"
    },
    frameInfomation: {
        backgroundColor: "pink",
        paddingVertical: 10,
        position: "relative",
    },
    wrapAvatar: {
        height: 70,
        width: 70,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: "#bdbcbc",
        padding: 2,
    },
    frameAvatar: {
        height: "100%",
        width: "100%",
        borderRadius: 35,
        backgroundColor: "#d6ebff",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default UserPage;