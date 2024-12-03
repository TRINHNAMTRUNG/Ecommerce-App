import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { memo, useState, useRef, useEffect } from 'react';
import { useModal } from '../../components/modelDialog';
import { verifyOtp } from '../../services/authService';
import Joi from 'joi';

const OtpPage = ({ navigation, route }) => {
    let stateParams;
    if (route?.params) {
        stateParams = route.params;
    }
    const [code, setCode] = useState({ first: '', second: '', third: '', fourth: '', fifth: '', sixth: '' });
    const { openModal } = useModal();
    // Tạo các ref cho các TextInput
    const inputRefs = {
        first: useRef(null),
        second: useRef(null),
        third: useRef(null),
        fourth: useRef(null),
        fifth: useRef(null),
        sixth: useRef(null),
    };
    useEffect(() => {
        inputRefs["first"].current.focus();
    }, [])

    const handleChangeText = (text, name, nextInput, prevInput) => {
        console.log(text)
        setCode(prevState => {
            if (prevState[name] !== "" && prevState[nextInput] === "" && text !== "") {
                inputRefs[nextInput].current.focus();
                return {
                    ...prevState,
                    [nextInput]: text,
                }
            }
            return {
                ...prevState,
                [name]: text,
            }
        });

        if (text === '' && prevInput) {
            inputRefs[prevInput].current.focus();
        } else if (nextInput && text !== "") {
            inputRefs[nextInput].current.focus();
        }
    };

    const verifyCode = async () => {
        const codeString = Object.values(code).join('');
        const schemaOtp = Joi.string()
            .trim()
            .length(6)
            .required()
            .messages({
                "*": "Số OTP không hợp lệ.",
            })
        const { error } = schemaOtp.validate(codeString);
        if (error) {
            openModal(error.details[0].message, "error");
        } else {
            const result = await verifyOtp({ pinId: stateParams.pinId, pin: codeString });
            if (result.success) {
                stateParams.registerUser();
            } else {
                openModal(result.message, "error");
            }
        }
    }

    return (
        <View style={styleOtpPage.container}>
            <TouchableOpacity style={styleOtpPage.backLink} onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faArrowLeft} size={20} color="#000" />
                <Text style={styleOtpPage.backLinkText}>Trở lại</Text>
            </TouchableOpacity>

            <Text style={styleOtpPage.title}>Xác thực</Text>
            <Text style={styleOtpPage.description}>
                Chúng tôi đã gửi SMS kèm mã xác thực tới <Text style={styleOtpPage.phoneNumber}>+48 888 888 888</Text>
                {'\n'}Vui lòng nhập mã bên dưới và nhấn nút xác nhận.
            </Text>

            <View style={styleOtpPage.codeInputs}>
                <TextInput
                    style={styleOtpPage.codeInput}
                    maxLength={1}
                    value={code.first}
                    ref={inputRefs.first}
                    onChangeText={(text) => handleChangeText(text, 'first', 'second', null)}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styleOtpPage.codeInput}
                    maxLength={1}
                    value={code.second}
                    ref={inputRefs.second}
                    onChangeText={(text) => handleChangeText(text, 'second', 'third', 'first')}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styleOtpPage.codeInput}
                    maxLength={1}
                    value={code.third}
                    ref={inputRefs.third}
                    onChangeText={(text) => handleChangeText(text, 'third', 'fourth', 'second')}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styleOtpPage.codeInput}
                    maxLength={1}
                    value={code.fourth}
                    ref={inputRefs.fourth}
                    onChangeText={(text) => handleChangeText(text, 'fourth', 'fifth', 'third')}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styleOtpPage.codeInput}
                    maxLength={1}
                    value={code.fifth}
                    ref={inputRefs.fifth}
                    onChangeText={(text) => handleChangeText(text, 'fifth', 'sixth', 'fourth')}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styleOtpPage.codeInput}
                    maxLength={1}
                    value={code.sixth}
                    ref={inputRefs.sixth}
                    onChangeText={(text) => handleChangeText(text, 'sixth', null, 'fifth')}
                    keyboardType="numeric"
                />
            </View>

            <Text style={styleOtpPage.resendText}>
                Bạn chưa nhận được mã?{' '}
                <Text style={styleOtpPage.resendLink}>Gửi lại!</Text>
            </Text>

            <TouchableOpacity style={styleOtpPage.signUpButton} onPress={() => verifyCode()}>
                <Text style={styleOtpPage.signUpButtonText}>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    );
};

const styleOtpPage = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: '#DEEBFF',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    backLink: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginVertical: 20,
    },
    backLinkText: {
        color: '#000',
        marginLeft: 5,
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
        marginVertical: 20,
    },
    description: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },
    phoneNumber: {
        fontWeight: 'bold',
    },
    codeInputs: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 20,
    },
    codeInput: {
        width: 40,
        height: 40,
        fontSize: 18,
        textAlign: 'center',
        borderColor: '#ccc',
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    resendText: {
        color: '#555',
        marginBottom: 20,
    },
    resendLink: {
        fontWeight: 'bold',
        color: '#000',
    },
    signUpButton: {
        backgroundColor: '#ff6600',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default memo(OtpPage);
