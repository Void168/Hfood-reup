import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import {Container, Row, Col} from 'react-bootstrap'
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
//import firebase from '../firebase';


export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [voucher, setVoucher] = useState('');
    const [phone, setPhone] = useState('');
    const [passwordLength, setPasswordLength] = useState(0);
    const [avatar, setAvatar] = useState(null)
    const [error1, setError1] =useState(false)

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(() => {
    if (!user) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(detailsUser(userInfo._id));
    } else {
        setAvatar(user.avatar)
        setName(user.name);
        setEmail(user.email);
        setVoucher(user.voucher);
        setPhone(user.phone);
    }
    }, [dispatch, userInfo._id, user]);
    const submitHandler = (e) => {
        e.preventDefault();
        // let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha')
        // let number = user.phone;
        // firebase.auth().comfirmWithPhoneNumber(number, recaptcha).then(function (e)
        // {
        //     let code = prompt('Nhập mã otp gửi về điện thoại của bạn', '');
        //     if (code == null) return;
        //     e.confirm(code).then(function (result)
        //     {
                
        //     }).catch((error) =>
        //     {
        //         alert('Mã otp không đúng!');
        //     })
        // })
        dispatch(
            updateUserProfile({
                userId: user._id,
                avatar,
                name,
                email,
                voucher,
                phone,
                password,
            })
        );
    };

    const handleChangeAvatar = (e) =>{
        const selected = e.target.files[0];
        const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
        if(selected && ALLOWED_TYPES.includes(selected.type)){
            let reader = new FileReader();
            reader.onloadend = () =>{
                setAvatar(reader.result)
            }
            reader.readAsDataURL(selected)
        }else{
            setError1(true)
            setAvatar(userInfo.avatar)
        }
    }

    return (
    <Container className="section">
        <Row>
            <div>
                <h1 style={{fontSize: '4rem'}} 
                className="profile-title">Thông tin tài khoản</h1>
            </div>
            <Col xl={4} lg={4} md={12}>
                    <Col className="profile">
                        <Row>
                            <Col xl={4} lg={4} md={12}>
                                <div className="Avatar">
                                    <Container>
                                        <img style={{ borderRadius:'50%',
                                            background: avatar ? `url("${avatar}") no-repeat center/cover`
                                            : "#c4c4c4"
                                            }} className="avatar-change left" alt="">
                                        </img>
                                    </Container>
                                </div>  
                            </Col>
                            <Col xl={8} lg={8} md={12}>
                                <div>
                                    <Container>
                                        <br />
                                        <label>{name}</label>
                                        <label>{email}</label>
                                    </Container>
                                </div>  
                            </Col>
                        </Row>
                        <Col style={{margin: '2rem 0'}} className="profile-choice">
                            <div><Link to="/cart">Giỏ hàng</Link></div>
                            <div><Link to="/cart">Sản phẩm ưa thích</Link></div>
                            <div><Link to="/orderhistory">Lịch sử</Link></div>
                        </Col>
                    </Col>
            </Col>
            <Col lg={8}>
                <Row>
                    <Col lg={4}></Col>
                    <Col lg={4} style={{textAlign: 'center'}}>
                    <div className="Avatar">
                        <Container>
                            {
                                error1 && <p className="errorMsg">
                                    Không hỗ trợ định dạng file ảnh này
                                </p>
                            }
                            <p>Thay đổi ảnh đại diện</p>
                            <img style={{ borderRadius:'50%',
                                background: avatar ? `url("${avatar}") no-repeat center/cover`
                                : "#c4c4c4"
                                }} className="avatar-change" alt="">
                            </img>
                            {   userInfo.avatar && (
                                <Row>
                                    <p>
                                    <label htmlFor="fileUpload" 
                                        className="customFileUpload" style={{cursor:'pointer'}}>
                                            Chọn ảnh <span><i class="fas fa-camera"></i></span><br/>
                                    </label>
                                    </p>
                                    <input type="file" id="fileUpload" onChange={handleChangeAvatar} />
                                </Row>
                            )}
                        </Container>
                    </div>
                    </Col>
                    <Col xl={4}></Col>
                    
                </Row>
                    <form className="profile-form" onSubmit={submitHandler}>
                        {loading ? (
                        <LoadingBox></LoadingBox>
                        ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                        ) : (
                        <>
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                        {errorUpdate && (
                            <MessageBox variant="danger">{errorUpdate}</MessageBox>
                        )}
                        {successUpdate && (
                            <MessageBox variant="success">
                                Cập nhật thành công
                            </MessageBox>
                        )}
                        <div>
                            <TextField id="standard-basic"
                            type="text"
                            label="Tên nguời dùng"
                            placeholder="Nhập tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <TextField id="standard-basic"
                            type="email"
                            label="Email"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                            </div>
                            <div>
                            <Tooltip title={<h5>Mật khẩu phải có ít nhất 8 ký tự, ký tự đầu tiên viết hoa và ít nhất 1 ký tự là số</h5>}>
                                <HelpOutlineIcon />
                            </Tooltip>
                            <TextField id="standard-basic"
                                        type="password"
                                        label="Cập nhật mật khẩu"
                                        placeholder="Nhập lại mật khẩu"
                                        value={password}
                                        onChange={ e =>
                                            {
                                                setPassword(e.target.value);
                                                setPasswordLength(e.target.value.length);
                                            }}
                                            />
                        </div>
                        <div>
                            {
                                passwordLength > 7 &&
                                password.match(/\d/) &&
                                password.charAt(0) === password.charAt(0).toUpperCase() ? (
                                    <>
                                        <Row  style={{textAlign: 'center',  color:'green'}}>
                                            <h3>Mật khẩu phù hợp</h3>
                                        </Row>
                                                </>                                      
                                            ) : passwordLength === 0 ? (
                                                    null
                                            ) : (
                                                    <>
                                                    <Row  style={{textAlign: 'center',color:'red'}}>
                                                            <h3>Mật khẩu quá yếu</h3>
                                                    </Row>
                                                </>          
                                            )
                                        }

                                        </div>
                                     <div>
                                            <TextField id="standard-basic"
                                                type="text"
                                                label="Số điện thoại"
                                                placeholder="Nhập số điện thoại"
                                                value={phone}
                                                onChange={ e =>
                                            {
                                                setPhone(e.target.value);
                                            }}
                                                />
                                        </div>
                                        {
                                            passwordLength < 8 &&
                                            passwordLength > 0  ? (
                                            <div className="center">
                                                <button type="submit" style={{width: '50%'}} disabled>
                                                    Cập nhật
                                                </button>
                                            </div>
                                            ) : (
                                            <div className="center">
                                                <button type="submit" style={{width: '50%'}}>
                                                    Cập nhật
                                                </button>
                                            </div>   
                                            )
                                        }
                        <div> 
                            {voucher}
                        </div>
                        </> 
                    )}
                    </form>
                    {/* <div className="list-item">
                            <table>
                                    {
                                        user.voucher.map(item => (

                                            <tr key={item.voucher}>
                                                <td>
                                                    {item.voucher}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </table>
                        </div> */}
            </Col>
        </Row>
        
    </Container>
    );
}