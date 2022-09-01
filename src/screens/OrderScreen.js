import React, { useEffect, useState } from 'react';
import {Container, Col, Row} from 'react-bootstrap'
import {PayPalButton} from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions.js';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from 'axios';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay} = orderPay
    const dispatch = useDispatch();

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
              setSdkReady(true);
            };
            document.body.appendChild(script);
          };
        if(!order || successPay || (order && order._id !== orderId)){
            dispatch(detailsOrder(orderId));
        }else{
            if(!order.isPaid){
                if(!window.paypal){
                    addPayPalScript()
                }else{
                    setSdkReady(true)
                }
            }
        }
    }, [dispatch, orderId, sdkReady, successPay, order]);

    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrder(order, paymentResult));
    }
    return loading ?(   
        <LoadingBox></LoadingBox>
        ) : error ? ( 
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
        <Container className="section">
            <Row>
                <Col lg={8}>
                    <ul>
                        <li>
                        <div className="place-order-element">
                            <h2>Địa chỉ giao hàng</h2><br />
                            <p>
                            <strong>Tên:</strong> {order.shippingAddress.fullName} <br />
                            <strong>Địa chỉ: </strong> {order.shippingAddress.address}<br />
                            <strong>Email: </strong>{order.shippingAddress.email} <br />
                            <strong>Tỉnh/Thành phố: </strong>{order.shippingAddress.city}<br />
                            <strong>Quận/Huyện: </strong>{order.shippingAddress.district}<br />
                            <strong>Điện thoại: </strong>{order.shippingAddress.phone}
                            </p>
                            {
                                order.isDelivered ? <MessageBox variant="success">
                                    Đã vận chuyển
                                </MessageBox> : <MessageBox variant="danger">
                                    Chưa vận chuyển
                                </MessageBox>
                            }
                        </div>
                        </li>
                        <li>
                        <div className="place-order-element">
                            <h2>Phương thức thanh toán</h2>
                            <p>
                            <strong>{order.paymentMethod}</strong> 
                            </p>
                            {
                                order.isPaid ? (
                                    <MessageBox variant="success">
                                        Đã thanh toán
                                    </MessageBox>    
                                ) : (
                                    <MessageBox variant="danger">
                                        Chưa thanh toán
                                    </MessageBox>   
                                )
                            }
                        </div>
                        </li>
                        <li>
                        <div className="list-item">
                            <table>
                                    {
                                        order.orderItems.map(item => (

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
                    <div className="card-body note paypal">
                        <div>
                            <h1>Thông tin đơn hàng</h1>
                        </div>
                        <ul style={{paddingLeft: '0'}}>
                            <li>
                                <h2>
                                    <strong>Mã đơn hàng:</strong> {order._id}
                                </h2>
                            </li>
                            <li>
                                <h2>
                                    <strong>Tổng tiền các mặt hàng:</strong> {order.itemsPrice.toFixed(0)} vnđ
                                </h2>
                            </li>
                            <li>
                                <h2>
                                    <strong>Phí vận chuyển:</strong> {order.shippingPrice.toFixed(0)} vnđ
                                </h2>
                            </li>
                            <li>
                                <h2>
                                    <strong>Thuế:</strong> {order.taxPrice.toFixed(0)} vnđ
                                </h2>
                            </li>
                            <li>
                                <h2>
                                    <strong> Tổng thanh toán:</strong> {order.totalPrice.toFixed(0)} vnđ
                                </h2>
                            </li>
                            {
                                !order.isPaid && (
                                    <li>
                                        {
                                            !sdkReady ? (
                                                <LoadingBox></LoadingBox>
                                            ) : (
                                                <>
                                                {
                                                    errorPay && (
                                                        <MessageBox variant="danger">
                                                            {errorPay}
                                                        </MessageBox>
                                                    )
                                                }
                                                {
                                                    loadingPay && <LoadingBox></LoadingBox>
                                                }
                                                {
                                                    order.paymentMethod === "Paypal" ? (
                                                          <PayPalButton 
                                                            amount={order.totalPrice / 2000}
                                                            onSuccess={successPaymentHandler}
                                                        ></PayPalButton>              
                                                    ) : (
                                                        null        
                                                    )
                                                }
                                                </>
                                            )  
                                        }
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
