import React ,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Col, Row, InputGroup, FormControl, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { signin } from '../actions/userActions';

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [emailReset, setEmailReset] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [showPopup, setShowPopup] = useState(false);

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email, password));
    };

    const ShowHidePassword = () =>
    {
        if (!showPassword) {
            setShowPassword(true);
        } else {
            setShowPassword(false);
        }
    }

    const openPopup = () =>
    {
        if (!showPopup) {
            setShowPopup(true)
        } else {
            setShowPopup(false)
        }
        
    }
    
    var api_key = '99367874615ad09ff8bde92edca8eb10-20ebde82-0998f89a';
    var domain = 'www.mydomain.com';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
    
    var data = {
    from: 'Excited User <Hfood@gmail.com>',
    to: email,
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
    };
    
    mailgun.messages().send(data, function (error, body) {
    console.log(body);
    });

    useEffect(() =>{
        if(userInfo){
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])
    return (
        <div>
            <Container fluid className="section">
                <Container className="signin-main"> 
                    <Row>
                        <Col xl={8} lg={8} md={6} xs={0}>
                            <img src="/image/banner/carousel3.jpg" alt="LargeBanner" />
                        </Col>
                        <Col xl={4} lg={4} md={6} xs={12}>
                            <div className="signin-form">
                                <div>
                                    Đăng Nhập
                                </div>
                                <form onSubmit={submitHandler}>
                                    {loading && <LoadingBox></LoadingBox>}
                                    {error && <MessageBox variant>{error}</MessageBox>}
                                    <div>
                                        <label htmlFor="email">Email</label><br/>
                                        <input type="email" 
                                            id="email"
                                            name="email" 
                                            placeholder="Nhập email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="password">Mật khẩu</label><br/>
                                        <input type={showPassword === true ? 'password' : "text"}  
                                            id="password"
                                            name="password" 
                                            placeholder="Nhập mật khẩu"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        ></input>
                                        <span onClick={ShowHidePassword}>
                                        <i className={showPassword ? "fas fa-eye-slash eye-1" : "fas fa-eye eye-1"}></i></span>
                                    </div>
                                    <div>
                                        <label />
                                        <button type="submit">
                                            Xác Nhận
                                        </button>
                                    </div>
                                    <div>
                                        Chưa có tài khoản? {''} 
                                        <Link to={`/register?register=${redirect}`}>
                                            Đăng ký
                                        </Link>
                                    </div>
                                    <div style={{cursor:'pointer'}}>
                                            <h4  onClick={openPopup}>Quên mật khẩu? {''} </h4>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className={!showPopup ? "popup-hide" : "popup-show"}>
                    <div className="popup">
                        <div>
                            <span style={{position: 'absolute', right: '1.5rem'}}>
                                <i class="fas fa-times-circle"
                                    style={{
                                        color: 'red',
                                        fontSize: '2rem',
                                        cursor:'pointer'
                                    }}
                                onClick={openPopup}></i>
                            </span>
                            <label>Tên người dùng</label>
                                <InputGroup className="mb-3">
                                    <FormControl className="search-box radius"                                    aria-label="emailbox"
                                                aria-describedby="email"
                                                style={{ width: '50%', margin:'1rem 0'}}
                                    />
                                </InputGroup>
                        </div>
                        <div>
                            <label>Email của bạn</label>
                                <InputGroup className="mb-3">
                                    <FormControl className="search-box radius"
                                                placeholder="Nhập email của bạn"
                                                aria-label="emailbox"
                                                aria-describedby="email"
                                    style={{ width: '50%', marginTop: '1rem' }}
                                    value={emailReset}
                                    onChange={(e) => setEmailReset(e.target.value)}
                                    />
                                </InputGroup>
                        </div>
                                
                                <div className="center" style={{ marginTop:'4rem'}}>
                                    <Button variant="outline-secondary" className="radius">
                                        Xác nhận
                                    </Button>
                                </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
