import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { memo, useRef, useState } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from "react-redux";
import { actionLogin } from '../../store/Action/authAction';
import { loginSvc } from "../../services/authService"
import Joi from 'joi';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../../components/modelDialog';
const Login = ({ navigation, route }) => {
    let dataLogin = {};
    if (route?.params?.dataLogin) {
        dataLogin = route.params.dataLogin;
    }
    const dispatch = useDispatch();
    const { openModal } = useModal();

    const [phoneNumber, setPhone] = useState(dataLogin ? dataLogin.phoneNumber : "");
    const [password, setPass] = useState(dataLogin ? dataLogin.password : "");
    let validate = useRef(0);
    const [validatePhone, setValidatePhone] = useState("");
    const [validatePassword, setValidatePassword] = useState("");
    const schemaVertifyJoi = {
        phoneNumber: Joi.string()
            .trim()
            .pattern(/^(84|0[3|5|7|8|9])[0-9]{8}$/)
            .required()
            .messages({
                "*": "Số điện thoại phải bắt đầu bằng 84 hoặc 0 và có độ dài phù hợp.",
            })
        ,
        password: Joi.string()
            .trim()
            .required()
            .messages({
                "*": "Mật khẩu không để trống.",
            })
        ,
    };

    const handleLogin = async () => {
        validate.current = 1; // Đặt validate.current = 1 ngay khi nhấn "Tiếp tục"
        const userInfo = {
            phoneNumber,
            password
        }
        try {
            const result = await loginSvc(userInfo);
            if (result.success === true) {
                dispatch(actionLogin({ ...result.data, role: "customer" }));
            } else {
                openModal(result.errors[0], "error");
                // openModal("Đăng ký thành công!", "success");
            }
        } catch (error) {
            error.errors.forEach((detail) => {
                if (detail.context.key === "phoneNumber") {
                    setValidatePhone(detail.message);
                }
                if (detail.context.key === "password") {
                    setValidatePassword(detail.message);
                }
            });
        }
    }
    const validateField = (value, schema, setError) => {
        if (validate.current !== 0) {
            const { error } = schema.validate(value);
            setError(error ? error.details[0].message : "");
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Image source={require('../../assets/thumb/bglogin.png')} style={styles.imgBanner} />
                        <View style={styles.document}>
                            <Text style={styles.txtIntro}>Xin chào,</Text>
                            <Text style={styles.txtTitle}>Đăng nhập hoặc tạo tài khoản</Text>
                            <View style={{ marginBottom: 20 }}>
                                <TextInput
                                    keyboardType="numeric"
                                    placeholder='Số điện thoại'
                                    placeholderTextColor="#d8d8d8"
                                    style={[
                                        styles.textInput,
                                        validatePhone !== "" && validate.current > 0 ?
                                            { borderColor: "#DC3545" }
                                            :
                                            validatePhone === "" && validate.current > 0 ?
                                                { borderColor: "#0d6aff" }
                                                :
                                                { borderColor: "#d8d8d8" }
                                    ]}
                                    value={phoneNumber}
                                    onChangeText={(value) => {
                                        setPhone(value);
                                        validateField(value, schemaVertifyJoi.phoneNumber, setValidatePhone);
                                    }}
                                />
                                {validatePhone !== "" &&
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                        <FontAwesomeIcon icon={faCircleExclamation} color='#DC3545' size={11} style={{ marginRight: 4 }} />
                                        <Text style={{ color: "#DC3545", fontSize: 11 }}>
                                            {validatePhone}
                                        </Text>
                                    </View>
                                }
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <TextInput
                                    placeholder='Mật khẩu'
                                    placeholderTextColor="#d8d8d8"
                                    style={[
                                        styles.textInput,
                                        validatePassword !== "" && validate.current > 0 ?
                                            { borderColor: "#DC3545" }
                                            :
                                            validatePassword === "" && validate.current > 0 ?
                                                { borderColor: "#0d6aff" }
                                                :
                                                { borderColor: "#d8d8d8" }
                                    ]}
                                    secureTextEntry
                                    value={password}
                                    onChangeText={(value) => {
                                        setPass(value);
                                        validateField(value, schemaVertifyJoi.password, setValidatePassword);
                                    }}
                                />
                                {validatePassword !== "" &&
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                        <FontAwesomeIcon icon={faCircleExclamation} color='#DC3545' size={11} style={{ marginRight: 4 }} />
                                        <Text style={{ color: "#DC3545", fontSize: 11 }}>
                                            {validatePassword}
                                        </Text>
                                    </View>
                                }
                            </View>
                            <TouchableOpacity style={styles.btnContainer} onPress={() => handleLogin()}>
                                <Text style={styles.txtContainer}>Tiếp tục</Text>
                            </TouchableOpacity>
                            <Text
                                style={{ fontSize: 14, color: "#0A68FF", fontWeight: "500", marginTop: 20, alignSelf: "center" }}
                                onPress={() => navigation.navigate("Register")}
                            >
                                Đăng kí tài khoản
                            </Text>
                            <Text
                                style={{ fontSize: 14, color: "#0A68FF", fontWeight: "500", marginTop: 20, alignSelf: "center" }}
                                onPress={() => navigation.navigate("Register")}
                            >
                                Quên mật khẩu?
                            </Text>
                        </View>
                        <View style={styles.footer}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: "#d8d8d8" }} />
                                <Text style={styles.txtFooter}>Hoặc tiếp tục bằng</Text>
                                <View style={{ flex: 1, height: 1, backgroundColor: "#d8d8d8" }} />
                            </View>

                            <View style={styles.itemLogo}>
                                <TouchableOpacity style={styles.btnLogo}>
                                    <Image source={require('../../assets/thumb/face.png')} style={styles.logo} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnLogo}>
                                    <Image source={require('../../assets/thumb/gg.png')} style={styles.logo} />
                                </TouchableOpacity>

                            </View>
                            <Text style={styles.txtPolicy}>
                                Bằng việc tiếp tục, bạn đã đọc và đồng ý với điều khoản sử dụng, chính sách bảo
                                mật thông tin cá nhân và hướng dẫn hủy/xóa tài khoản của Tiki
                            </Text>
                        </View>
                    </View>
                </ScrollView>

            </SafeAreaView>
        </SafeAreaProvider>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    imgBanner: {
        width: '100%',
        height: 190,
    },
    document: {
        flex: 1.2,
        paddingHorizontal: 20,
        // backgroundColor:'red'
    },
    txtIntro: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 12
    },
    txtTitle: {
        fontSize: 16,
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: "#d8d8d8",
        height: 50,
        color: 'black',
        fontSize: 20,
    },
    btnContainer: {
        backgroundColor: '#ff515a',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 5
    },
    txtContainer: {
        color: '#fff',
        fontSize: 20,
        padding: 6
    },
    btnEmail: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    txtEmail: {
        color: 'blue',
        fontSize: 14,
        fontWeight: '450'
    },
    footer: {
        // backgroundColor:'red',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 30
    },
    txtFooter: {
        marginHorizontal: 15
    },
    itemLogo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    btnLogo: {
        width: 50,
        height: 50,
        marginLeft: 20,
        marginRight: 20
    },
    logo: {
        width: 50,
        height: 50,

    },
    txtPolicy: {
        marginTop: 20,
        fontSize: 14
    }


})

export default memo(Login);