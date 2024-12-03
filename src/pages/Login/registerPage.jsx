import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { memo, useRef, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { registerSvc, sendOtp } from '../../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleExclamation, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Joi from 'joi';
import { useModal } from '../../components/modelDialog';
import { schemaAccountJoi } from '../../models/authSchema';

const Register = ({ navigation }) => {
    let validate = useRef(0);

    const schemaRegister = {
        customerName: Joi.string()
            .trim()
            .required()
            .messages({
                "*": "Tên không để trống",
            })
        ,

        phoneNumber: Joi.string()
            .trim()
            .pattern(/^(84|0[3|5|7|8|9])[0-9]{8}$/)
            .required()
            .messages({
                "*": "Số điện thoại phải bắt đầu bằng 84 hoặc 0 và có độ dài phù hợp.",
            })
        ,
        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .required()
            .messages({
                "*": "Mật khẩu tối thiểu 8 kí tự, chứa chữ cái hoa, thường và kí tự đặc biệt.",
            })
        ,
        passConfirm: Joi.string()
            .trim()
            .required()
            .messages({
                "*": "Mật khẩu không để trống.",
            })
        ,
        email: Joi.string()
            .trim()
            .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
            .required()
            .messages({
                "*": "Email không hợp lệ.",
            })
        ,
    }

    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");

    const [validCustomerName, setValidCustomerName] = useState("");
    const [validEmail, setValidEmail] = useState("");
    const [validPhoneNumber, setValidPhoneNumber] = useState("");
    const [validPassword, setValidPassword] = useState("");
    const [validPassConfirm, setValidPassConfirm] = useState("");
    const { openModal } = useModal();

    const registerUser = async () => {
        const dataRegister = {
            customerName,
            email,
            phoneNumber,
            password,
            role: "customer"
        }
        try {
            const result = await registerSvc(dataRegister);
            if (result.success === true) {
                openModal("Đăng ký thành công!", "success");
                navigation.navigate("Login", { dataLogin: { phoneNumber, password } });
            } else {
                console.log(result)
                openModal(result.errors[0], "error");
            }
        } catch (error) {
            error.errors.forEach((detail) => {
                if (detail.context.key === "customerName") {
                    setValidCustomerName(detail.message);
                }
                if (detail.context.key === "email") {
                    setValidEmail(detail.message);
                }
                if (detail.context.key === "phoneNumber") {
                    setValidPhoneNumber(detail.message);
                }
                if (detail.context.key === "password") {
                    setValidPassword(detail.message);
                }
            });
            if (!passConfirm) {
                setValidPassConfirm("Mật khẩu không được trống");
            }
            if (passConfirm && passConfirm !== password) {
                setValidPassConfirm("Mật khẩu không khớp");
            }
        }
    }

    const handleRegister = async () => {

        validate.current = 1;
        const dataRegister = {
            customerName,
            email,
            phoneNumber,
            password,
            role: "customer"
        }

        const { error } = schemaAccountJoi.validate(dataRegister, { abortEarly: false });
        if (!error && passConfirm && passConfirm === password) {
            try {
                const result = await sendOtp(phoneNumber);
                if (result.success) {
                    navigation.navigate("OtpPage", { registerUser, pinId: result.data.pinId });
                } else {
                    openModal(result.message, "error");
                }
            } catch (error) {
                openModal(error.message, "error");
            }
        } else if (error) {
            console.log("???? error ", error);
            error.details.forEach((detail) => {
                if (detail.context.key === "customerName") {
                    setValidCustomerName(detail.message);
                }
                if (detail.context.key === "email") {
                    setValidEmail(detail.message);
                }
                if (detail.context.key === "phoneNumber") {
                    setValidPhoneNumber(detail.message);
                }
                if (detail.context.key === "password") {
                    setValidPassword(detail.message);
                }
            });

        } else {
            if (!passConfirm) {
                setValidPassConfirm("Mật khẩu không được trống");
            }
            if (passConfirm && passConfirm !== password) {
                setValidPassConfirm("Mật khẩu không khớp");
            }
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
                        <TouchableOpacity style={styles.backLink} onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} size={20} color="white" />
                            <Text style={styles.backLinkText}>Trở lại</Text>
                        </TouchableOpacity>
                        <Image source={require('../../assets/thumb/bglogin.png')} style={styles.imgBanner} />
                        <View style={styles.main}>
                            <TouchableOpacity style={styles.btnUpfile}>
                                <Image source={require('../../assets/thumb/icontiki.png')} style={styles.LogoUpfile} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

                            <View style={{ marginBottom: 10, }}>
                                <Text style={styles.label}>Họ & Tên</Text>
                                <TextInput
                                    placeholderTextColor="#d8d8d8"
                                    placeholder='Nhập họ tên'
                                    style={[
                                        styles.textInput,
                                        validCustomerName !== "" && validate.current > 0 ?
                                            { borderColor: "#DC3545" }
                                            :
                                            validCustomerName === "" && validate.current > 0 ?
                                                { borderColor: "#0d6aff" }
                                                :
                                                { borderColor: "#d8d8d8" }
                                    ]}
                                    value={customerName}
                                    onChangeText={(value) => {
                                        setCustomerName(value);
                                        validateField(value, schemaRegister.customerName, setValidCustomerName);
                                    }}
                                />
                                {validCustomerName !== "" &&
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                        <FontAwesomeIcon icon={faCircleExclamation} color='#DC3545' size={11} style={{ marginRight: 4 }} />
                                        <Text style={{ color: "#DC3545", fontSize: 11, justifyContent: "center" }}>
                                            {validCustomerName}
                                        </Text>
                                    </View>
                                }
                            </View>
                            <View style={{ marginBottom: 10, }}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    placeholderTextColor="#d8d8d8"
                                    placeholder='Nhập email'
                                    style={[
                                        styles.textInput,
                                        validEmail !== "" && validate.current > 0 ?
                                            { borderColor: "#DC3545" }
                                            :
                                            validEmail === "" && validate.current > 0 ?
                                                { borderColor: "#0d6aff" }
                                                :
                                                { borderColor: "#d8d8d8" }
                                    ]}
                                    value={email}
                                    onChangeText={(value) => {
                                        setEmail(value)
                                        validateField(value, schemaRegister.email, setValidEmail);
                                    }}
                                />
                                {validEmail !== "" &&
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                        <FontAwesomeIcon icon={faCircleExclamation} color='#DC3545' size={11} style={{ marginRight: 4 }} />
                                        <Text style={{ color: "#DC3545", fontSize: 11 }}>
                                            {validEmail}
                                        </Text>
                                    </View>
                                }
                            </View>
                            <View style={{ marginBottom: 10, }}>
                                <Text style={styles.label}>Số điện thoại</Text>
                                <TextInput
                                    placeholderTextColor="#d8d8d8"
                                    placeholder='Nhập số điện thoại'
                                    style={[
                                        styles.textInput,
                                        validPhoneNumber !== "" && validate.current > 0 ?
                                            { borderColor: "#DC3545" }
                                            :
                                            validPhoneNumber === "" && validate.current > 0 ?
                                                { borderColor: "#0d6aff" }
                                                :
                                                { borderColor: "#d8d8d8" }
                                    ]}
                                    value={phoneNumber}
                                    onChangeText={(value) => {
                                        setPhoneNumber(value)
                                        validateField(value, schemaRegister.phoneNumber, setValidPhoneNumber);
                                    }}
                                />
                                {validPhoneNumber !== "" &&
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                        <FontAwesomeIcon icon={faCircleExclamation} color='#DC3545' size={11} style={{ marginRight: 4 }} />
                                        <Text style={{ color: "#DC3545", fontSize: 11 }}>
                                            {validPhoneNumber}
                                        </Text>
                                    </View>
                                }
                            </View>
                            <View style={{ marginBottom: 10, }}>
                                <Text style={styles.label}>Mật khẩu</Text>
                                <TextInput
                                    placeholderTextColor="#d8d8d8"
                                    style={[
                                        styles.textInput,
                                        validPassword !== "" && validate.current > 0 ?
                                            { borderColor: "#DC3545" }
                                            :
                                            validPassword === "" && validate.current > 0 ?
                                                { borderColor: "#0d6aff" }
                                                :
                                                { borderColor: "#d8d8d8" }
                                    ]}
                                    placeholder='Nhập mật khẩu'
                                    secureTextEntry
                                    value={password}
                                    onChangeText={(value) => {
                                        setPassword(value)
                                        validateField(value, schemaRegister.password, setValidPassword);
                                    }}
                                />
                                {validPassword !== "" &&
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                        <FontAwesomeIcon icon={faCircleExclamation} color='#DC3545' size={11} style={{ marginRight: 4 }} />
                                        <Text style={{ color: "#DC3545", fontSize: 11 }}>
                                            {validPassword}
                                        </Text>
                                    </View>
                                }
                            </View>
                            <View style={{ marginBottom: 10, }}>
                                <Text style={styles.label}>Nhập lại mật khẩu</Text>
                                <TextInput
                                    placeholderTextColor="#d8d8d8"
                                    style={[
                                        styles.textInput,
                                        validPassConfirm !== "" && validate.current > 0 ?
                                            { borderColor: "#DC3545" }
                                            :
                                            validPassConfirm === "" && validate.current > 0 ?
                                                { borderColor: "#0d6aff" }
                                                :
                                                { borderColor: "#d8d8d8" }
                                    ]}
                                    placeholder='Mật khẩu của bạn'
                                    secureTextEntry
                                    value={passConfirm}
                                    onChangeText={(value) => {
                                        setPassConfirm(value)
                                        validateField(value, schemaRegister.passConfirm, setValidPassConfirm);
                                    }}
                                />
                                {validPassConfirm !== "" &&
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                        <FontAwesomeIcon icon={faCircleExclamation} color='#DC3545' size={11} style={{ marginRight: 4 }} />
                                        <Text style={{ color: "#DC3545", fontSize: 11 }}>
                                            {validPassConfirm}
                                        </Text>
                                    </View>
                                }
                            </View>
                            <TouchableOpacity style={styles.btnContainer} onPress={() => handleRegister()}>
                                <Text style={styles.txtContainer} onPress={() => handleRegister()}>Đăng ký</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>

    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 3
    },
    container: {
        width: '100%',
        backgroundColor: "white",
        position: "relative",
    },
    backLink: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginVertical: 20,
        marginLeft: 20,
        position: "absolute",
        top: 0,
        zIndex: 1
    },
    backLinkText: {
        color: 'white',
        marginLeft: 5,
    },
    imgBanner: {
        width: '100%',
        height: 200,
        resizeMode: 'stretch',
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnUpfile: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    LogoUpfile: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    scrollContent: {
        paddingHorizontal: 20, // Thêm padding cho nội dung trong ScrollView
        flexGrow: 1, // Đảm bảo ScrollView có thể cuộn
        justifyContent: 'flex-start', // Đảm bảo nội dung bắt đầu từ trên
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: "#d8d8d8",
        height: 36, // Đặt chiều cao cho TextInput
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

});

export default memo(Register);