import React from 'react'
import {Row, Container} from 'react-bootstrap'

export default function CheckoutSteps(props) {
    return (
        <Container className="section">
            <Row className="checkout-steps">
                <div className={props.step1 ? 'active': ''}>Đăng ký</div>
                <div className={props.step2 ? 'active': ''}>Vận chuyển</div>
                <div className={props.step3 ? 'active': ''}>Thanh toán</div>
                <div className={props.step4 ? 'active': ''}>Đặt hàng</div>
            </Row>
        </Container>
    )
}