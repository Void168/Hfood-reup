import React, { useEffect } from 'react';
import {Container, Col, Row} from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions.js';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
      props.history.push('/payment');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = (num) => Number(num.toFixed(0));
    cart.itemsPrice = toPrice(
      cart.cartItems.reduce((a, c) => (a+c.price - c.discount * c.price /100) * c.qty, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 1000000 ? toPrice(0) : toPrice(0.02 * cart.itemsPrice);
    cart.taxPrice = toPrice(0.1 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice  + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
      dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };
    console.log(cart.itemsPrice[0])
    useEffect(() => {
      if (success) {
        props.history.push(`/order/${order._id}`);
        dispatch({ type: ORDER_CREATE_RESET });
      }
    }, [dispatch, order, props.history, success]);
    return (
        <Container>
            <Row>
                <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            </Row>
            <Row>
                <Col xl={8} lg={8}>
                    <ul>
                        <li>
                        <div className="place-order-element">
                            <h2>Địa chỉ giao hàng</h2><br />
                            <p>
                            <strong>Tên:</strong> {cart.shippingAddress.fullName} <br />
                            <strong>Địa chỉ: </strong> {cart.shippingAddress.address}<br />
                            <strong>Email: </strong>{cart.shippingAddress.email} <br />
                            <strong>Tỉnh/Thành phố: </strong>{cart.shippingAddress.city}<br />
                            <strong>Quận/Huyện: </strong>{cart.shippingAddress.district}<br />
                            <strong>Điện thoại: </strong>{cart.shippingAddress.phone}
                            </p>
                        </div>
                        </li>
                        <li>
                        <div className="place-order-element">
                            <h2>Phương thức thanh toán</h2>
                            <p>
                            <strong>{cart.paymentMethod}</strong> 
                            </p>
                        </div>
                        </li>
                        <li>
                        <div className="list-item">
                            <table>
                                    { cart.cartItems.length > 0 && (
                                        <tr colspan="1" style={{width: "100%", textAlign:'center'}}>
                                            <strong>Sản phẩm đã đặt</strong>
                                        </tr>
                                        )
                                    }
                                    {
                                        cart.cartItems.map(item => (

                                            <tr key={item.product}>
                                                <td>
                                                    <img src={item.image} alt={item.name} className="small" />
                                                </td>
                                                <td className="min-30">
                                                    <Link to ={`/product/${item.product}`}>{item.name}</Link>
                                                </td>
                                                <td>
                                                    {item.qty}
                                                </td>
                                                <td>
                                                    {item.qty} x {item.price - item.price * item.discount / 100} = {''}
                                                    {item.qty * (item.price - item.price * item.discount / 100)} (vnđ)
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </table>
                        </div>
                    </li>
                </ul>
                </Col>
                <Col lg={4}>
                    <div className="card-body note">
                        <div>
                            <h1>Thông tin đơn hàng</h1>
                        </div>
                        <ul style={{paddingLeft: '0'}}>
                            <li>
                                <h2>
                                    <strong>Tổng tiền các mặt hàng:</strong> {cart.itemsPrice.toFixed(0)} vnđ
                                </h2>
                            </li>
                            <li>
                                <h2>
                                    <strong>Phí vận chuyển:</strong> {cart.shippingPrice.toFixed(0)} vnđ
                                </h2>
                            </li>
                            <li>
                                <h2>
                                    <strong>Thuế:</strong> {cart.taxPrice.toFixed(0)} vnđ
                                </h2>
                            </li>
                            <li>
                                <h2>
                                    <strong> Tổng thanh toán:</strong> {cart.totalPrice.toFixed(0)} vnđ
                                </h2>
                            </li>
                            <li>
                                <h2  style={{textAlign: 'center'}}>
                                    <strong> Đơn hàng trên 1000000 vnđ được miễn phí vận chuyển</strong>
                                </h2>
                            </li>
                            
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                    <div>
                                <button
                                type="button"
                                className="place-order-button"
                                onClick={placeOrderHandler}
                                disabled={cart.cartItems.length === 0}
                                >
                                Đặt hàng
                                </button>
                            </div>
                </Col>
            </Row>
        </Container>
    )
}
