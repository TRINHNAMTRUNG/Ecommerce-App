import { LOGIN, LOGOUT, UPDATE_USER } from "../Action/authAction";

const initialState = {
    user: null,
    isAuthenticated: false
}

const authReducer = (state = initialState, action) => {
    let dataUser = action.payload;
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: dataUser,
                isAuthenticated: true
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false
            };
        case UPDATE_USER:
            return {
                ...state,
                user: {...state.user, ...action.payload }
            }
        default:
            return state;
    }
}


export default authReducer;