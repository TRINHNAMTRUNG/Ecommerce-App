


import axios from "../utils/customAxios"


const postPayment = async (dataPayment) => {
    console.log("TRINH NAM TRUNG")
    try {
        const response = await axios.post(
            `/payment`,
            dataPayment,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },

            }
        );
        return response;
    } catch (error) {
        console.error("Error handle payment:", error);
        throw error;
    }
};

const confirmTransaction = async (dataPayment) => {
    console.log("REQ  data ", dataPayment);
    try {
        const response = await axios.post(
            `/payment/confirmTransaction`,
            { dataPayment },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            }
        );
        console.log("RES   ", response);
        return response;
    } catch (error) {
        console.error("Error handle payment:", error);
        throw error;
    }
}

export {
    postPayment,
    confirmTransaction
}