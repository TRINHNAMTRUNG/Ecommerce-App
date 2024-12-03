import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducer/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // Sử dụng AsyncStorage thay vì localStorage
    blacklist: ['loading'],
};

// Tạo reducer lưu trữ được bọc với redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

// Khởi tạo persistor
let persistor = persistStore(store);

export { store, persistor };
