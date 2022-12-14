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
                                    ????ng Nh???p
                                </div>
                                <form onSubmit={submitHandler}>
                                    {loading && <LoadingBox></LoadingBox>}
                                    {error && <MessageBox variant>{error}</MessageBox>}
                                    <div>
                                        <label htmlFor="email">Email</label><br/>
                                        <input type="email" 
                                            id="email"
                                            name="email" 
                                            placeholder="Nh???p email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="password">M???t kh???u</label><br/>
                                        <input type={showPassword === true ? 'password' : "text"}  
                                            id="password"
                                            name="password" 
                                            placeholder="Nh???p m???t kh???u"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        ></input>
                                        <span onClick={ShowHidePassword}>
                                        <i className={showPassword ? "fas fa-eye-slash eye-1" : "fas fa-eye eye-1"}></i></span>
                                    </div>
                                    <div>
                                        <label />
                                        <button type="submit">
                                            X??c Nh???n
                                        </button>
                                    </div>
                                    <div>
                                        Ch??a c?? t??i kho???n? {''} 
                                        <Link to={`/register?register=${redirect}`}>
                                            ????ng k??
                                        </Link>
                                    </div>
                                    <div style={{cursor:'pointer'}}>
                                            <h4  onClick={openPopup}>Qu??n m???t kh???u? {''} </h4>
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
                            <label>T??n ng?????i d??ng</label>
                                <InputGroup className="mb-3">
                                    <FormControl className="search-box radius"                                    aria-label="emailbox"
                                                aria-describedby="email"
                                                style={{ width: '50%', margin:'1rem 0'}}
                                    />
                                </InputGroup>
                        </div>
                        <div>
                            <label>Email c???a b???n</label>
                                <InputGroup className="mb-3">
                                    <FormControl className="search-box radius"
                                                placeholder="Nh???p email c???a b???n"
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
                                        X??c nh???n
                                    </Button>
                                </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
