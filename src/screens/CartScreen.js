import { Link } from 'react-router-dom';
import React, { useEffect } from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Select, MenuItem } from '@material-ui/core';

import MessageBox from '../components/MessageBox'

export default function CartScreen(props)
{
    const productId = props.match.params.id;
    const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
        : 1
    const discount = props.location.search
    ? Number(props.location.search.split('=')[1])
        : 1
    const cart = useSelector((state) => state.cart);
    const { cartItems, error } = cart;
    const dispatch = useDispatch();
    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId, qty, discount));
        }
    }, [dispatch, productId, qty, discount])
    
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
      };
    
      const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
      };
    return (
        <div>
        
            <Container className="section">
                <Row>
                    <Col xl={8} lg={8}>
                        <div className="title">
                            <h1>Giỏ hàng</h1>
                        </div>
                        {
                            cartItems.length > 0 ? (
                                <span className="broccoli">
                                    <img src="/image/icon/broccoli.png" alt="" />
                                </span>
                            ) : (
                                    null
                            )
                        }
                        
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                        {                       
                            cartItems.length === 0 ?                       
                                <MessageBox>Giỏ hàng trống
                                    <Link to='/'>&nbsp;Tiếp tục mua hàng</Link>
                                </MessageBox>
                                : (
                                    <div>
                                        <table>
                                            <tr className="center">
                                                <th></th>
                                                <th>Tên mặt hàng</th>
                                                <th>Số lượng</th>
                                                <th>Đơn giá <br/>(theo số lượng)</th>
                                                <th>Ghi chú</th>
                                            </tr>
                                            {
                                                cartItems.map(item => (

                                                    <tr key={item.product}>
                                                        <td className="center">
                                                            <img src={item.image} alt={item.name} className="small" />
                                                        </td>
                                                        <td className="min-30 center">
                                                            <Link to ={`/product/${item.product}`}>{item.name}</Link>
                                                        </td>
                                                        <td className="center">
                                                            <Select value={item.qty}
                                                                    style={{fontSize: '2rem'}} 
                                                                    onChange={ (e) =>
                                                                        dispatch(
                                                                            addToCart(item.product, Number(e.target.value))
                                                                        )
                                                                    }>
                                                        {
                                                            [...Array(item.countInStock).keys()].map(x => (
                                                                <MenuItem key={ x + 1 } value={ x + 1 }>{ x + 1 }</MenuItem>
                                                            ))
                                                        }
                                                            </Select>
                                                        </td>
                                                        <td className="center">
                                                            {(item.price - item.price * item.discount/100) * item.qty} vnđ
                                                        </td>
                                                        <td className="center">
                                                            <button type="button" className="delete" onClick ={
                                                                () => removeFromCartHandler(item.product)}>
                                                                    Xóa
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </table>
                                    </div>
                                )
                            }
                        </Col>
                    <Col xl={4} lg={4}>
                        <span className="pencil">
                            <img src="/image/icon/pencil.png" alt="" />
                        </span>
                        <div className="card-body note">
                            <div><h1>Tổng cộng</h1></div>
                                <ul style={{marginRight:'1rem'}}>
                                    <li>
                                        <h2>
                                            Số sản phẩm: {cartItems.reduce((a,c) => a+c.qty, 0)} 
                                        </h2>
                                    </li>
                                    <li>
                                        <h2>
                                            Tổng giá: {cartItems.reduce((a,c) => ((a+c.price - c.discount * c.price /100) * c.qty), 0)} vnđ
                                        </h2>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    <Col lg={8}>
                        {
                            cartItems.length > 0 ? (
                                <Link to='/' className="link">Tiếp tục mua hàng</Link>
                            ) : (
                                null  
                            )
                        }
                        </Col>
                        <Col lg={4} className="proceed-to-checkout">
                            <button type="button" onClick={checkoutHandler}
                                            disabled ={cartItems.length === 0}>
                                            Tiến hành kiểm tra
                            </button>
                        </Col>
                    </Row>
            </Container>
        </div>
    )
}
