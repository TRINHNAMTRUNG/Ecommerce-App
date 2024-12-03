export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER = "UPDATE_USER";

export const actionLogin = (dataUser) => {
    return {
        type: LOGIN,
        payload: dataUser
    }
}
export const actionLogout = () => {
    return {
        type: LOGOUT
    }
}
export const actionUpdate = (dataUser) => {
    return {
        type: UPDATE_USER,
        payload: dataUser
    }
}