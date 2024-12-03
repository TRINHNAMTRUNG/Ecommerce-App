import axios from "axios";
import { store } from "../store/store";
import { showLoading, hidenLoading } from "../store/Action/loadingAction";
const instance = axios.create({
    baseURL: 'https://81a5-58-186-29-95.ngrok-free.app/v1/api/'
});
// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        if (config.showLoading) {
            store.dispatch(showLoading());
        }
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error 
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    store.dispatch(hidenLoading());
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("check success response: ", response.data);
    return response && response.data ? response.data : response;
}, function (error) {
    store.dispatch(hidenLoading());

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log("check error response: ", error);
    // console.log("check error response >>> 2: ", error.response);
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance;