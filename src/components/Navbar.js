import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
    Container, 
    Row, 
    Col, 
    Dropdown, 
    Form} from 'react-bootstrap'
import {Route, Link} from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import {listCategories} from '../actions/categoryActions'

import Categories from './Categories'
import { signout } from '../actions/userActions.js';
import SearchBox from '../components/SearchBox.js'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'

export default function Navbar() {
    const [show, setShow] =useState(false);
    const [navbar, setNavbar] =useState(false);
    const [hamburger, setHamburger] = useState(false);
    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () =>{
        dispatch(signout());
    }
    useEffect(() =>{
        dispatch(listCategories({}));
    },[dispatch]);

    const setFixed = () =>{
        if(window.scrollY >=200){
            setNavbar(true)
        }else{
            setNavbar(false)
        }
    }

    const setFixed1 = () =>{
        if(window.scrollY >=200){
            setHamburger(true)
        }else{
            setHamburger(false)
        }
    }

    window.addEventListener('scroll', setFixed)
    window.addEventListener('scroll', setFixed1)
    return (    <>
                    <Container fluid sm={12}>
                            <div className={navbar ? 'navbar active' : 'navbar'}>
                                     { show ? (
                                         
                                        <div className="hamburger-menu" onClick={() => setShow(false)}>
                                        <span className="line line1"></span>
                                        <span className="line line2"></span>
                                        <span className="line line3"></span>
                                        </div>
                                     ) : (
                                        <div className="hamburger-menu" onClick={() => setShow(true)}>
                                            <span className="line"></span>
                                            <span className="line"></span>
                                            <span className="line"></span>
                                        </div>
                                     )
                                        
                                    }
                                <Link to="/" className="brand-text">
                                        <img src="../image/logo/brand-image.png" alt="logo"/>
                                </Link>
                                <Col lg={1} md={0} className="brand">
                                    <Link to="/">
                                        <img src="../image/logo/sfsff.png" alt="logo" />
                                    </Link>
                                </Col>
                                <Col lg={11} md={12}>
                                    <Row className="nav-1">
                                        <Col xl={0} lg={0} md={1} className="brand1">
                                            <Link to="/">
                                                <img src="../image/logo/sfsff.png" alt="logo" />
                                            </Link>
                                        </Col>
                                        <Col xl={4} lg={4} md={6} >
                                            <SearchBox>
                                            <Route
                                                render={({ history }) => (
                                                    <SearchBox history={history}></SearchBox>
                                                )}
                                                ></Route>
                                            </SearchBox>
                                        </Col>
                                        <Col xl={3} lg={3} className="phone">
                                            <Row>
                                                <Col lg={1}><i class="fas fa-phone"></i></Col>
                                                <Col lg={11}>
                                                    <h3>
                                                        Số điện thoại: <br/>
                                                        0123456789 | 1900100có
                                                    </h3> 
                                                </Col>  
                                            </Row>
                                        </Col>
                                        <Col xl={2} lg={2} md={3}>
                                            <Row>
                                                <Col lg={12} className="contact">           
                                                    <a href="https://www.facebook.com/hfoodweb" target="_blank" rel="noreferrer">
                                                        <i class="fab fa-facebook"></i>
                                                    </a>
                                                    <a href="https://www.instagram.com/2021.hfood/" target="_blank" rel="noreferrer">
                                                        <i class="fab fa-instagram"></i>
                                                    </a>
                                                </Col>
                                            </Row>
                                        </Col>
                                            <Col xl={2} lg={2} md={2}>
                                                <Link to="/cart">
                                                    <div className="cart">
                                                        <img src="../image/icon/cart.png" alt="cart" />
                                                        { 
                                                            userInfo && cartItems.length > 0 ? (
                                                            cartItems.length > 0 && (
                                                                <Dropdown style={{zIndex:'10001', width:'100%'}}>
                                                                    <div className="amount-items">
                                                                        {cartItems.length} mặt hàng
                                                                        &nbsp;<i className="fa fa-caret-down"></i>

                                                                    <ul style={{
                                                                        zIndex: '10001',
                                                                        position: 'relative',                                 
                                                                        overflowY: "scroll",
                                                                        height:'250px'
                                                                    }}>
                                                                            {
                                                                                    cartItems.map(item => (
                                                                                        <li key={item.product} style={{               
                                                                                                overflow: 'hidden',
                                                                                                textOverflow: "ellipsis",
                                                                                                borderBottom:'1px solid #c4c4c4'}}>
                                                                                                <Link to={`/product/${item.product}`}
                                                                                                    style={{fontSize:'1.5rem'}}>{item.name}</Link>
                                                                                            </li>
                                                                                ))
                                                            }
                                                                        <li className="total-dropdown">
                                                                           Tổng giá: {cartItems.reduce((a,c) => (a+c.price - c.discount * c.price /100) * c.qty, 0)} vnđ
                                                                        </li>
                                                                    </ul>
                                                                    </div>
                                                                </Dropdown>                 
                                                            ) 
                                                            ) : (
                                                                    <div className="amount-items">
                                                                        0 mặt hàng
                                                                    </div>
                                                            )      
                                                        }                                                     
                                                    </div>
                                                </Link>
                                            </Col>
                                    </Row>
                                    <Row className="nav-2">
                                        <Col xl={10} lg={9} md={10}>
                                            <ul className="grid-container">
                                            {loading ? (
                                                <LoadingBox></LoadingBox>
                                            ) : error ? (
                                                <MessageBox variant="danger">{error}</MessageBox>
                                            ) : (
                                                    categories.map((category) => (
                                                        <Categories key={category} category={category} >
                                                        </Categories>
                                                    ))
                                            )
                                        }
                                            </ul>
                                        </Col>
                                        <Col xl={2} lg={2} md={2} className="account">
                                            <Col lg={12} md={12}>
                                                        
                                                        {
                                                            userInfo ? (
                                                                <>
                                                                <Col lg={2}>
                                                                    <Avatar src={userInfo.avatar} alt="avatar"></Avatar>
                                                                </Col>
                                                                    <div className="account-name">
                                                                        <Dropdown>    
                                                                            <Link to="#">{userInfo.name}</Link>
                                                                                {' '}<i className="fa fa-caret-down"></i>
                                                                            <ul>
                                                                                {
                                                                                    userInfo.isAdmin && (
                                                                                    <>
                                                                                        <li><Link to="/dashboard">Dash Board</Link></li>
                                                                                        <li><Link to="/productlist">Sản phẩm</Link></li>
                                                                                        <li><Link to="/orderlist">Đơn hàng</Link></li>
                                                                                        <li><Link to="/userlist">Người dùng</Link></li>
                                                                                    </>
                                                                                    )
                                                                                }
                                                                                <li><Link to="/profile">Tài khoản</Link></li>
                                                                                <li><Link to="/orderhistory">Lịch sử</Link></li>
                                                                                <li>
                                                                                    <Link to='#signout' onClick={signoutHandler}>
                                                                                        Đăng xuất
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>
                                                                        </Dropdown>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                <Avatar alt="avatar"></Avatar>
                                                                <div className="account-name">
                                                                    <Link to="/signin">Đăng Nhập</Link>
                                                                </div>
                                                                </>
                                                            )
                                                        }                                                   
                                            </Col>
                                        </Col>
                                    </Row>
                                </Col>
                            </div>
                    </Container>
                {
                    <>
                    <div>
                        <ul id={hamburger ? 'hamburger-list-active' : 'hamburger-list'} className={show ? 'appear' :''}>
                        <div>
                            <Form.Label style={{margin:'2rem 0 0 2rem ', fontWeight:'bold', fontSize:'1.8rem'}}>
                                Tìm kiếm
                            </Form.Label>
                            <SearchBox>
                                <Route
                                    render={({ history }) => (
                                        <SearchBox history={history}></SearchBox>
                                    )}
                                ></Route>
                            </SearchBox>
                            <Link to="/cart">
                                <div className="cart" style={{ marginBottom:'1rem'}}>
                                    <img src="../image/icon/cart.png" alt="cart" />
                                        { 
                                            userInfo && cartItems.length > 0 ? (
                                            cartItems.length > 0 &&  (
                                            <div className="amount-items">
                                                {cartItems.length} mặt hàng
                                            </div>
                                            ) 
                                        ) : (
                                            <div className="amount-items">
                                                0 mặt hàng
                                            </div>
                                        )}                                                     
                                    </div>
                            </Link>
                        </div>
                        <li style={{ marginTop:"6rem"}}>
                            {loading ? (
                            <LoadingBox></LoadingBox>
                                ) : error ? (
                                    <MessageBox variant="danger">{error}</MessageBox>
                                ) : (
                                    categories.map((category) => (
                                        <Categories key={category} category={category}>
                                        </Categories>
                                    ))
                                )
                            }
                        </li>
                        <div>
                        {
                            userInfo ? (
                            <Row>
                                <Avatar src={userInfo.avatar} alt="avatar"></Avatar>
                                <div className="account-name">
                                    <Dropdown>    
                                        <Link to="#">{userInfo.name}</Link>
                                        {' '}<i className="fa fa-caret-down"></i>
                                        <ul>
                                            <li><Link to="/profile">Tài khoản</Link></li>
                                            <li><Link to="/orderhistory">Lịch sử</Link></li>
                                            <li>
                                                <Link to='#signout' onClick={signoutHandler}>
                                                    Đăng xuất
                                                </Link>
                                            </li>
                                            {
                                            userInfo.isAdmin && (
                                                <>
                                                    <li><Link to="/dashboard">Dash Board</Link></li>
                                                    <li><Link to="/productlist">Sản phẩm</Link></li>
                                                    <li><Link to="/orderlist">Đơn hàng</Link></li>
                                                    <li><Link to="/userlist">Người dùng</Link></li>
                                                </>
                                                )
                                            }       
                                        </ul>
                                    </Dropdown>
                                </div>
                            </Row>
                                ) : (
                                <>
                                    <Avatar alt="avatar"></Avatar>
                                    <div className="account-name">
                                        <Link to="/signin">Đăng Nhập</Link>
                                    </div>
                                </>
                                )}    
                            </div>
                        </ul>
                    </div>
                    </>                
                } 
                </>
    )
}
