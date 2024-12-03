


import axios from "../utils/customAxios"


const getListTopDeal = async (page, isShowLoading) => {
    const limit = 8;
    try {
        const response = await axios.get(
            `product/top-deal?limit=${limit}&page=${page}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                showLoading: isShowLoading
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching category data:", error);
        throw error;
    }
};
const getListTopDealNew = async (page, isShowLoading) => {
    const limit = 8;
    try {
        const response = await axios.get(
            `product/top-deal-new?limit=${limit}&page=${page}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                showLoading: isShowLoading
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching category data:", error);
        throw error;
    }
};
const getListTopDealBook = async (page, isShowLoading) => {
    const limit = 8;
    try {
        const response = await axios.get(
            `product/top-deal-book?limit=${limit}&page=${page}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                showLoading: isShowLoading
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching category data:", error);
        throw error;
    }
};
const getSearchProduct = async (data) => {
    const { name, page, isShowLoading, sort_by, order } = data;
    const limit = 8;
    let conditions = "&sort_by=createdAt&order=desc";
    const validSortFields = ['price', 'createdAt', 'quantitySold'];
    const validOrderFields = ['desc', 'asc'];
    if (sort_by && order && validSortFields.includes(sort_by) && validOrderFields.includes(order)) {
        conditions = `&sort_by=${sort_by}&order=${order}`
    }
    try {
        const response = await axios.get(
            `product/search?name=${name}&limit=${limit}&page=${page}${conditions}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                showLoading: isShowLoading
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching category data:", error);
        throw error;
    }
};
const getListByCatg = async (data) => {
    const { page, idCatg, isShowLoading, sort_by, order } = data;
    const limit = 8;
    let conditions = "&sort_by=createdAt&order=desc";
    const validSortFields = ['price', 'createdAt', 'quantitySold'];
    const validOrderFields = ['desc', 'asc'];
    if (sort_by && order && validSortFields.includes(sort_by) && validOrderFields.includes(order)) {
        conditions = `&sort_by=${sort_by}&order=${order}`
    }
    try {
        const response = await axios.get(
            `product/byCategory?&limit=${limit}&page=${page}&id=${idCatg}${conditions}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                showLoading: isShowLoading ? isShowLoading : false
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching category data:", error);
        throw error;
    }
};


export {
    getListTopDeal,
    getListTopDealBook,
    getListTopDealNew,
    getSearchProduct,
    getListByCatg
}