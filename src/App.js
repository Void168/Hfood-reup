import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import {BrowserRouter, Route} from 'react-router-dom'
import ScrollToTop from './components/scrollToTop.js'
import VoucherIcon from './components/VoucherIcon.js';
import Map from './components/Map.js'
import AdminRoute from './components/AdminRoute.js'
import PrivateRoute from './components/PrivateRoute.js';
import Navbar from './components/Navbar.js'

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
                                C??NG TY C??? PH???N HFOOD
                                ?? 2021 - 2100 C??ng Ty C??? Ph???n Th????ng M???i HFOOD
                                </h2>
                                <h3>Gi???y ch???ng nh???n ????ng k?? doanh nghi???p: 0280920130 do S??? KH-??T TP.HCM c???p l???n ?????u ng??y 16 th??ng 08 n??m 2021</h3><br/>
                                <h4>
                                    Ch??nh s??ch v???n chuy???n
                                </h4>
                                <h4>
                                    Ch??m S??c Kh??ch H??ng
                                </h4>
                                <h4>
                                    Thanh To??n
                                </h4>
                                <br/>
                            </Col>
                            <Col xl={4} lg={4} md={12} className="left-2">
                                <h3>
                                    ?????a ch??? tr??? s??? ch??nh:
                                    279 Nguy???n Tri Ph????ng, ph?????ng 5, qu???n 10, TP. H??? Ch?? Minh<br/>
                                    V??n ph??ng ??i???u h??nh mi???n B???c:
                                    T???ng 6, S??? 1 Ph??? Mai ?????ng, Ph?????ng Kim Ng??u, Qu???n Ho??ng Mai, H?? N???i<br/>
                                    V??n ph??ng ??i???u h??nh mi???n Nam:
                                    T???ng 3, s??? 5/3 ????? S??n, Ph?????ng 4, Qu???n T??n B??nh, TP. H??? Ch?? Minh<br/><br/><br/><br/><br/>
                                    <strong>&emsp; &emsp; &emsp; &emsp; All rights reserved &emsp; &emsp; &emsp; &emsp; CopyRight ?? 2021</strong>
                                </h3>
                                <br/>
                            </Col>
                            <Col xl={5} lg={5} md={12} className="left-3" style={{textAlign: 'center'}}>
                                <Map />
                            </Col>
                            </Row>
                    </Container>                
                </footer>
            </div>
            <ScrollToTop />
            <VoucherIcon/>
    </BrowserRouter>
    );
}

export default App;