import Joi from "joi";
import axios from "../utils/customAxios"; // Đảm bảo đường dẫn đúng

const addProductToCart = async (data) => {
    // Schema Joi để validate dữ liệu trước khi gọi API
    const cartSchemaJoi = Joi.object({
        customer: Joi.string()
            .required()
            .messages({ "string.pattern.base": "Customer ID phải là ObjectId hợp lệ" }),
        product: Joi.string()
            .required()
            .messages({ "string.pattern.base": "Product ID phải là ObjectId hợp lệ" }),
        itemsQty: Joi.number()
            .required()
            .min(1)
            .messages({ "number.base": "Số lượng sản phẩm phải là một số hợp lệ", "number.min": "Số lượng sản phẩm phải lớn hơn hoặc bằng 1" }),
    });

    // Validate dữ liệu
    const { error } = cartSchemaJoi.validate(data);
    if (error) {
        console.log("Validation Failed");
        throw {
            success: false,
            message: error.details.map((err) => err.message).join(", "),
        };
    }

    try {
        // Gọi API thêm sản phẩm vào giỏ hàng 
        const { customer, product, itemsQty } = data;
        const response = await axios.put(`cart/${customer}/${product}/${itemsQty}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        // Trả về dữ liệu nếu thành công
        return response;
    } catch (error) {
        // Nếu có lỗi xảy ra, trả về thông tin lỗi từ API
        console.error("Error fetching category data:", error);
        return error;
    }
};

const getCartItems = async (idCustomer) => {
    try {
        const response = await axios.get(
            `cart/${idCustomer}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        );
        return response;
    } catch (error) {
        console.error("Error fetching category data:", error);
        throw error;
    }
}
const removeProductFromCart = async (dataDelete) => {
    try {
        console.log(dataDelete);
        const response = await axios.delete(
            `cart/${dataDelete.customer}/${dataDelete.product}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        );
        return response;
    } catch (error) {
        console.error("Error remove product from cart:", error);
        throw error;
    }
}


export {
    addProductToCart,
    getCartItems,
    removeProductFromCart
};