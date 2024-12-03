import { SHOWLOADING, HIDENLOADING } from "../Action/loadingAction"
const initialState = {
    spinning: false
}

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOWLOADING:
            return {
                ...state,
                spinning: true
            };
        case HIDENLOADING:
            return {
                ...state,
                spinning: false
            };
        default:
            return state;
    }
}

export default loadingReducer;