import React, { useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {Row, Container} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

export default function PaymentMethodScreen(props) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
      props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      props.history.push('/placeorder');
    };
    return (
        <Container>
                <Row>
                    <CheckoutSteps step1 step2 step3></CheckoutSteps>
                </Row>
                <Container fluid>
                    <div>
                        <h1>Phương thức thanh toán</h1>
                    </div>
                    <form className="payment-main" onSubmit={submitHandler}>
                    <div>
                        <div>
                            <div>
                                <input
                                type="radio"
                                id="paypal"
                                value="PayPal"
                                name="paymentMethod"
                                required
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                ></input>
                                <label htmlFor="paypal">PayPal</label>
                            </div>
                        </div>
                            <div>
                                <input
                                type="radio"
                                id="cod"
                                value="CoD"
                                name="paymentMethod"
                                required
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                ></input>
                                <label htmlFor="cod">Thanh toán khi giao hàng</label>
                            </div>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <label />
                            <button type="submit">
                                Tiếp tục
                            </button>
                        </div>
                    </form>
                </Container>
            </Container>
    )
}
