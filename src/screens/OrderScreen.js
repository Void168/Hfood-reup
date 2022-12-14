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
                            <h2>?????a ch??? giao h??ng</h2><br />
                            <p>
                            <strong>T??n:</strong> {order.shippingAddress.fullName} <br />
                            <strong>?????a ch???: </strong> {order.shippingAddress.address}<br />
                            <strong>Email: </strong>{order.shippingAddress.email} <br />
                            <strong>T???nh/Th??nh ph???: </strong>{order.shippingAddress.city}<br />
                            <strong>Qu???n/Huy???n: </strong>{order.shippingAddress.district}<br />
                            <strong>??i???n tho???i: </strong>{order.shippingAddress.phone}
                            </p>
                            {
                                order.isDelivered ? <MessageBox variant="success">
                                    ???? v???n chuy???n
                                </MessageBox> : <MessageBox variant="danger">
                                    Ch??a v???n chuy???n
                                </MessageBox>
                            }
                        </div>
                        </li>
                        <li>
                        <div className="place-order-element">
                            <h2>Ph????ng th???c thanh to??n</h2>
                            <p>
                            <strong>{order.paymentMethod}</strong> 
                            </p>
                            {
                                order.isPaid ? (
                                    <MessageBox variant="success">
                                        ???? thanh to??n
                                    </MessageBox>    
                                ) : (
                                    <MessageBox variant="danger">
                                        Ch??a thanh to??n
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
                                                    {item.qty * (item.price - item.price * item.discount / 100)} (vn??)
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
                            <h1>Th??ng tin ????n h??ng</h1>
                        </div>
                        <ul style={{paddingLeft: '0'}}>
                            <li>
                                <h2>
                                    <strong>M?? ????n h??ng:</strong> {order._id}
                                </h2>
                            </li>
                            <li>
                                <h2>
                                    <strong>T???ng ti???n c??c m???t h??ng:</strong> {order.itemsPrice.toFixed(0)} vn??
                                </h2>
                            </li>
                            <li>
                                <h2>
                                    <strong>Ph?? v???n chuy???n:</strong> {order.shippingPrice.toFixed(0)} vn??
                                </h2>
                            </li>
                            <li>
                                <h2>
                                    <strong>Thu???:</strong> {order.taxPrice.toFixed(0)} vn??
                                </h2>
                            </li>
                            <li>
                                <h2>
                                    <strong> T???ng thanh to??n:</strong> {order.totalPrice.toFixed(0)} vn??
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
