import React, { useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {Row, Container} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import {TextField} from '@material-ui/core'

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!userInfo) {
        props.history.push('/signin');
      }

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [email, setEmail] = useState(shippingAddress.email);
    const [city, setCity] = useState(shippingAddress.city);
    const [district, setDistrict] = useState(shippingAddress.district);
    const [phone, setPhone] = useState(shippingAddress.phone);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, email, city, district, phone})
        );
        props.history.push('/payment');
    }

    return (
        <Container>
                <Row>
                    <CheckoutSteps step1 step2></CheckoutSteps>
                </Row>
                <Container fluid>
                    <div>
                        <h1>Thông tin vận chuyển</h1>
                    </div>
                    <div className= "shipping-main">
                        <Container fluid>
                            <form className="shipping-form" onSubmit={submitHandler}>
                                <table>
                                    <tr>
                                        <td>
                                        <TextField id="standard-basic"
                                                type="text"
                                                label="Họ tên"
                                                placeholder="Nhập họ tên"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                required
                                            />
                                        </td>
                                        <td>
                                        <TextField id="standard-basic"
                                                type="email"
                                                label="Email"
                                                placeholder="Nhập Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <TextField id="standard-basic"
                                                type="text"
                                                label="Địa chỉ"
                                                placeholder="Nhập địa chỉ"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                required
                                            />
                                        </td>
                                        <td>
                                        <TextField id="standard-basic"
                                                type="text" 
                                                label="Thành phố"
                                                placeholder="Nhập thành phố"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <TextField id="standard-basic"
                                                type="text"
                                                label="Quận/Huyện"
                                                placeholder="Quận/Huyện"
                                                value={district}
                                                onChange={(e) => setDistrict(e.target.value)}
                                                required
                                            />
                                        </td>
                                        <td>
                                        <TextField id="standard-basic"
                                                type="tel"
                                                label="Số Điện thoại"
                                                placeholder="Nhập điện thoại"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style={{ textAlign: 'center' }}>
                                            <button type="submit">
                                                Chuyển đến bước thanh toán
                                            </button>
                                        </td>
                                        
                                    </tr>
                                </table>
                            </form>
                        </Container>
                    </div>
                </Container>
            </Container>
    )
}
