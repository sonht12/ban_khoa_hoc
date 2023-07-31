import { combineReducers } from "redux";
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';


const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    auth: authReducer
});
export default rootReducer;