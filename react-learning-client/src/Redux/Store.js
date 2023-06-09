import { configureStore } from "@reduxjs/toolkit";
import userReducer from './User/UserSlice'
import adminReducer from './Admin/AdminSlice'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, userReducer)
const persistedAdminReducer = persistReducer(persistConfig, adminReducer)

export const Store = configureStore({
    reducer: {
        user: persistedReducer,
        admin: persistedAdminReducer
    }
})

export const persistor = persistStore(Store)