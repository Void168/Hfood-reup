import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers.js';
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productReviewCreateReducer, productUpdateReducer } from './reducers/productReducers.js';
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers.js';
import { orderCreateReducer, orderDeleteReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducers.js';
import { categoryDetailsReducer, categorytListReducer } from './reducers/categoryReducers.js';
import { voucherDetailsReducer, voucherListReducer } from './reducers/voucherReducers.js';

const initialState = {
    userSignin: {
      userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
  },
    userRegister: {
      userRegister: localStorage.getItem('userRegister')
        ? JSON.parse(localStorage.getItem('userRegister'))
        : null,
  },
    cart: {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
      shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
      paymentMethod: ['PayPal' || 'InternetBanking']
  },
};

  const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    categoryList: categorytListReducer,
    categoryDetails: categoryDetailsReducer,
    voucherList: voucherListReducer,
    voucherDetails: voucherDetailsReducer,
    productReviewCreate: productReviewCreateReducer,
  });
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
  );
  
  export default store;