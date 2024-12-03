import Joi from "joi";
import axios from "../utils/customAxios"

const updateCustomer = async(dataUpdate, field) => {


    const customerUpdateSchemaJoi = {
        customerName: Joi.string()
            .pattern(/^[a-zA-Z_ -]+$/)
            .optional(),
        nickName: Joi.string()
            .optional(),
        birthDate: Joi.date()
            .iso()
            .less("now")
            .greater("1900-01-01")
            .optional(),
        nationality: Joi.string()
            .optional(),
        avatar: Joi.string()
            .optional()
    };

    const { error } = customerUpdateSchemaJoi[field].validate(dataUpdate[field]);
    if (error) {
        console.log("FAILLLED");
        throw {
            success: false,
            errors: error.details[0]
        }
    }
    try {
        const result = await axios.put("/customer", dataUpdate);
        return result;
    } catch (error) {
        return error;
    }
}

export {
    updateCustomer
}