import React ,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Col, Row} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { register } from '../actions/userActions.js';

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailLength, setEmailLength] = useState(0);
    const [password, setPassword] = useState('');
    const [comfirmPassword, setConfirmPassword] = useState('');
    const [passwordLength, setPasswordLength] = useState(0);
    const [comfirmPasswordLength, setComfirmPasswordLength] = useState(0);
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== comfirmPassword){
            alert('Mật khẩu xác nhận không đúng!')
        }else{
            dispatch(register(name, email, password, phone));
        }
    };

    const ShowHidePassword = () =>
    {
        if (!showPassword) {
            setShowPassword(true);
        } else {
            setShowPassword(false);
        }
    }

    useEffect(() =>{
        if(userInfo){
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])
    console.log(emailLength)
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
                                    Đăng Ký
                                </div>
                                    <form onSubmit={submitHandler}>
                                    {loading && <LoadingBox></LoadingBox>}
                                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                                        <div>
                                            <label htmlFor="name">Tên</label><br/>
                                            <input type="name" 
                                                id="name"
                                                name="name" 
                                                placeholder="Nhập họ tên"
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            ></input>
                                        </div>
                                        <div>
                                                <label htmlFor="email">Email</label>
                                                {
                                                    emailLength > 0 ? (
                                                        <>
                                                        <Tooltip title={<h5>Email đã tồn tại</h5>}>
                                                            <HelpOutlineIcon />
                                                        </Tooltip><br />
                                                        </>
                                                    ) : (
                                                            null
                                                    )
                                                }
                                            
                                            <input type="email" 
                                                id="email"
                                                name="email" 
                                                placeholder="Nhập email"
                                                value={email}
                                                    onChange={e =>
                                                    {
                                                        setEmail(e.target.value)
                                                        setEmailLength(e.target.value.length)
                                                    }
                                                }
                                                style={ emailLength === 0 ? { color: "red"} : {color:'black'}}
                                                required
                                            ></input>
                                            </div>
                                            <div>
                                            {
                                                passwordLength <= 7 &&
                                                    passwordLength > 0 ? (
                                                <>
                                                    <label htmlFor="password">Mật khẩu</label>
                                                        <Tooltip title={<h5>Mật khẩu phải có ít nhất 8 ký tự, ký tự đầu tiên viết hoa và ít nhất 1 ký tự là số</h5>}>
                                                        <HelpOutlineIcon />
                                                    </Tooltip><br />
                                                    <input type={showPassword === true ? 'password' : "text"}
                                                        id="password"
                                                        name="password" 
                                                        placeholder="Nhập mật khẩu"
                                                        onChange={e =>
                                                        {
                                                            setPassword(e.target.value);
                                                            setPasswordLength(e.target.value.length);
                                                        }}
                                                        required
                                                        ></input>
                                                            <span onClick={ShowHidePassword}>
                                                                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i></span>
                                                        <h2 style={{textAlign: 'center', color:'#E73838'}}>Mật khẩu quá yếu</h2>
                                                </>
                                                ) : passwordLength > 7 ? (
                                                    <>
                                                            <label htmlFor="password">Mật khẩu</label>
                                                            <Tooltip title={<h5>Mật khẩu phải có ít nhất 8 ký tự, ký tự đầu tiên viết hoa và ít nhất 1 ký tự là số</h5>}>
                                                                <HelpOutlineIcon />
                                                            </Tooltip><br />
                                                        <input type={showPassword === true ? 'password' : "text"} 
                                                            id="password"
                                                            name="password" 
                                                            placeholder="Nhập mật khẩu"
                                                            onChange={e =>
                                                            {
                                                                setPassword(e.target.value);
                                                                setPasswordLength(e.target.value.length);
                                                            }}
                                                            required
                                                            ></input>
                                                            <span onClick={ShowHidePassword}>
                                                                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i></span>
                                                                {
                                                                    password.match(/\d/) &&
                                                                        password.charAt(0) === password.charAt(0).toUpperCase() ?(
                                                                        <h2 style={{textAlign: 'center', color:'#44EE35'}}>Mật khẩu phù hợp</h2>
                                                                    ) : (
                                                                        <h2 style={{textAlign: 'center', color:'#E73838'}}>Mật khẩu quá yếu</h2>
                                                                    )
                                                                }
                                                        
                                                    </>
                                                    ) : (
                                                            <>
                                                                <label htmlFor="password">Mật khẩu</label>
                                                                <Tooltip title={<h5>Mật khẩu phải có ít nhất 8 ký tự, ký tự đầu tiên viết hoa và ít nhất 1 ký tự là số</h5>}>
                                                                    <HelpOutlineIcon />
                                                                </Tooltip><br />
                                                                <input type={showPassword === true ? 'password' : "text"} 
                                                                    id="password"
                                                                    name="password" 
                                                                    placeholder="Nhập mật khẩu"
                                                                    onChange={e =>
                                                                    {
                                                                        setPassword(e.target.value);
                                                                        setPasswordLength(e.target.value.length);
                                                                    }}
                                                                    required
                                                                ></input>
                                                                <span onClick={ShowHidePassword}>
                                                                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i></span>
                                                            </>
                                                )
                                            }
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label><br/>
                                            <input type={showPassword === true ? 'password' : "text"} 
                                                id="confirmPassword"
                                                name="confirmPassword" 
                                                placeholder="Nhập lại mật khẩu"
                                                onChange={ e =>
                                                {
                                                    setConfirmPassword(e.target.value);
                                                    setComfirmPasswordLength(e.target.value.length);
                                                }}
                                                required
                                            ></input>
                                        </div>
                                        <div>
                                            <label htmlFor="phone">Số điện thoại</label><br/>
                                            <input type="phone" 
                                                id="phone"
                                                name="phone" 
                                                placeholder="Nhập số điện thoại"
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                            ></input>
                                        </div>
                                        <div>
                                            {
                                                passwordLength > 7 &&
                                                    name != null &&
                                                    email != null &&
                                                    comfirmPasswordLength === passwordLength ? (
                                                    <>
                                                        <label />
                                                        <button type="submit">
                                                            Đăng ký
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <label />
                                                        <button type="submit" disabled={true}>
                                                            Đăng ký
                                                        </button>
                                                    </>   
                                                )
                                            }
                                            
                                        </div>
                                        <div>
                                            Đã có tài khoản? <Link to="/signin">Đăng nhập</Link>
                                        </div>
                                </form>   
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    )
}
