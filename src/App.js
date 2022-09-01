import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import {BrowserRouter, Route} from 'react-router-dom'
import ScrollToTop from './components/scrollToTop.js'
import VoucherIcon from './components/VoucherIcon.js';
import Map from './components/Map.js'
import AdminRoute from './components/AdminRoute.js'
import PrivateRoute from './components/PrivateRoute.js';
import Navbar from './components/Navbar.js'
import MessengerCustomerChat from 'react-messenger-customer-chat'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen';
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import DashboardScreen from './screens/DashboardScreen'
import OrderListScreen from './screens/OrderListScreen';
import CategoryScreen from './screens/CategoryScreen'
import VoucherScreen from './screens/VoucherScreen'




function App() {
    return ( 
        <BrowserRouter>
            <div className="grid">
                <header>
                    <Navbar />
                </header>
                <main>
                        <Route path="/cart/:id?" component={CartScreen}></Route>
                        <Route path="/product/:id" component={ProductScreen}></Route>
                        <Route path="/category/:id" component={CategoryScreen}></Route>
                        <Route path="/signin" component={SigninScreen}></Route>
                        <Route path="/register" component={RegisterScreen}></Route> 
                        <Route path="/shipping" component={ShippingAddressScreen}></Route>
                        <Route path="/payment" component={PaymentMethodScreen}></Route>
                        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
                        <Route path="/order/:id" component={OrderScreen}></Route>
                        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
                        <Route path="/vouchers" component={VoucherScreen}></Route>
                        <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
                        <AdminRoute path="/productlist/:id/edit" component={ProductEditScreen} exact></AdminRoute>
                        <AdminRoute path="/dashboard" component={DashboardScreen} ></AdminRoute>
                        <AdminRoute path="/orderlist" component={OrderListScreen} exact ></AdminRoute>
                        <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
                        <AdminRoute path="/user/:id/edit" component={UserEditScreen} ></AdminRoute>
                        <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
                        <Route path="/" component={HomeScreen} exact></Route>
                </main> 
                <footer>
                    <Container fluid style={{backgroundColor:'#5B3C3C'}}>
                        <Row>
                            <Col xl={3} lg={3} md={12} className="left-1" style={{lineHeight:'2'}}>
                                <h2>
                                CÔNG TY CỔ PHẦN HFOOD
                                © 2021 - 2100 Công Ty Cổ Phần Thương Mại HFOOD
                                </h2>
                                <h3>Giấy chứng nhận đăng ký doanh nghiệp: 0280920130 do Sở KH-ĐT TP.HCM cấp lần đầu ngày 16 tháng 08 năm 2021</h3><br/>
                                <h4>
                                    Chính sách vận chuyển
                                </h4>
                                <h4>
                                    Chăm Sóc Khách Hàng
                                </h4>
                                <h4>
                                    Thanh Toán
                                </h4>
                                <br/>
                            </Col>
                            <Col xl={4} lg={4} md={12} className="left-2">
                                <h3>
                                    Địa chỉ trụ sở chính:
                                    279 Nguyễn Tri Phương, phường 5, quận 10, TP. Hồ Chí Minh<br/>
                                    Văn phòng điều hành miền Bắc:
                                    Tầng 6, Số 1 Phố Mai Động, Phường Kim Ngưu, Quận Hoàng Mai, Hà Nội<br/>
                                    Văn phòng điều hành miền Nam:
                                    Tầng 3, số 5/3 Đồ Sơn, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh<br/><br/><br/><br/><br/>
                                    <strong>&emsp; &emsp; &emsp; &emsp; All rights reserved &emsp; &emsp; &emsp; &emsp; CopyRight © 2021</strong>
                                </h3>
                                <br/>
                            </Col>
                            <Col xl={5} lg={5} md={12} className="left-3" style={{textAlign: 'center'}}>
                                <Map />
                            </Col>
                            </Row>
                    </Container>                
                </footer>
                <MessengerCustomerChat style={{height:'100%'}}
                    pageId="101814922198465"
                    appId="360428865760677"
                />
            </div>
            <ScrollToTop />
            <VoucherIcon/>
    </BrowserRouter>
    );
}

export default App;