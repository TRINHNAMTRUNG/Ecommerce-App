
import axios from "../utils/customAxios";
import {
    schemaAccountJoi,
    schemaVertifyJoi,
    schemaChangePassJoi
} from "../models/authSchema";
import Joi from "joi";

const loginSvc = async (dataLogin) => {
    const { error } = schemaVertifyJoi.validate(dataLogin, { abortEarly: false });
    if (error) {
        throw {
            success: false,
            errors: error.details
        }
    }
    try {
        const dataUser = await axios.post("/new/login", dataLogin);
        return dataUser;
    } catch (error) {
        return error;
    }
}

const registerSvc = async (dataRegister) => {
    const { error } = schemaAccountJoi.validate(dataRegister, { abortEarly: false });
    if (error) {
        throw {
            success: false,
            errors: error.details
        }
    }
    try {
        const dataUser = await axios.post("/new/register", dataRegister);
        await axios.post(`/cart/${dataUser.data._id}`);
        return dataUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}
const sendOtp = async (phoneNumber) => {
    const schemaPhone = Joi.string()
        .trim()
        .pattern(/^(84|0[3|5|7|8|9])[0-9]{8}$/)
        .required()
        .messages({
            "*": "Số điện thoại phải bắt đầu bằng 84 hoặc 0 và có độ dài phù hợp.",
        })

    const { error } = schemaPhone.validate(phoneNumber);
    if (error) {
        throw {
            success: false,
            errors: error.details[0]
        }
    }
    try {
        if (phoneNumber.startsWith('0')) {
            phoneNumber = '84' + phoneNumber.substring(1);
        }
        console.log(phoneNumber);
        const result = await axios.post("/otp/send", { phoneNumber });
        console.log("RESULT OTP: ", result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const verifyOtp = async (dataPin) => {
    const schemaOtp = Joi.string()
        .trim()
        .length(6)
        .required()
        .messages({
            "*": "Số OTP không hợp lệ.",
        })
    const { error } = schemaOtp.validate(dataPin.pin);
    if (error) {
        throw {
            success: false,
            errors: error.details[0]
        }
    }
    try {
        const result = await axios.post("/otp/verify", dataPin);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const changePassworSvc = async (dataChange) => {
    const { error } = schemaChangePassJoi.validate(dataChange);
    if (error) {
        throw {
            success: false,
            // errors: error.details[0].message
        }
    }
    try {
        const dataUser = await axios.put("/new/change-password", dataChange);
        return dataUser;
    } catch (error) {
        return error;
    }
}

export {
    loginSvc,
    registerSvc,
    changePassworSvc,
    sendOtp,
    verifyOtp
}