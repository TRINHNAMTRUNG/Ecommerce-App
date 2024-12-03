import Joi from "joi";

const schemaAccountJoi = Joi.object({
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
    role: Joi.string()
        .trim()
        .valid('customer')
        .required()
        .messages({
            "*": "Quyền không hợp lệ.",
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
}).unknown(false);

const schemaVertifyJoi = Joi.object({
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
}).unknown(false);

const schemaChangePassJoi = Joi.object({
    phoneNumber: Joi.string()
        .trim()
        .required()
    ,
    newPassword: Joi.string()
        .trim()
        .required()
    ,
    currentPassword: Joi.string()
        .trim()
        .required()
    ,
}).unknown(false);


export {
    schemaAccountJoi,
    schemaVertifyJoi,
    schemaChangePassJoi
}