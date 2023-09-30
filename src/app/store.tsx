// import productApi, { productReducer } from "@/api/product";
import categoryApi, { categoryReducer } from "@/Api/categoryApi";
import productApi, { productReducer } from "@/Api/productApi";
import userApi,{UserReducer} from "@/Api/userApi";
import BlogApi,{BlogReducer} from "@/Api/Blog"; "@/Api/Blog" 
import paymentApi,{paymentReducer} from "@/Api/payment";
import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Cấu hình persist ( lưu localStorage )
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}
const rootReducer = combineReducers({
    [productApi.reducerPath]: productReducer,
    [categoryApi.reducerPath]: categoryReducer,
    [userApi.reducerPath]: UserReducer,
    [BlogApi.reducerPath]: BlogReducer
    
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(productApi.middleware).concat(categoryApi.middleware).concat(userApi.middleware).concat(BlogApi.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
export default persistStore(store)