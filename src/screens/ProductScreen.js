import React, { useEffect, useState } from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import { Select, MenuItem, FormControl, InputLabel, makeStyles, Button } from '@material-ui/core'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { useDispatch, useSelector } from 'react-redux'
import { createReview, detailsProduct } from '../actions/productActions'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/LoadingBox'
import SimilarProducts from '../components/SimilarProducts'
import Image from '../components/image'
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 110,
    },
    selectEmpty: {
      marginTop: theme.spacing(-1),
    },
  }));

export default function ProductScreen(props) {
    const classes = useStyles();
    const productId = props.match.params.id
    
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const productList = useSelector((state) => state.productList);
    const { loading1, error1, products } = productList;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
    loading2: loadingReviewCreate,
    error2: errorReviewCreate,
    success: successReviewCreate,
    } = productReviewCreate;
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [selected, setSelected] = useState(Image[0]);
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
      };

    useEffect(() =>{
        dispatch(detailsProduct(productId));
    }, [dispatch, productId])

    useEffect(() => {
    if (successReviewCreate) {
      window.alert('Gửi nhận xét thành công');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    } if (errorReviewCreate)
    {
        window.alert('Bạn đã nhận xét sản phẩm này rồi');
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate, errorReviewCreate]);

    const selectNumber = (e) =>
    {
        setQty(e.target.value)
    }

    const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Hãy bình luận và chọn số sao');
    }
  };
    return (
        <Container className="section">
            {
                loading ? (
                <LoadingBox></LoadingBox>
                 ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                   )  :  (
                       <>
                                <div className="direction banner-titles" style={{ bottom: "-2px", color: "white" }}>
                                    Trang chủ <i class="fas fa-caret-right"></i> 
                                    Sản phẩm <i class="fas fa-caret-right"></i>
                                    {product.category} <i class="fas fa-caret-right"></i>
                                    {product.type} <i class="fas fa-caret-right"></i>
                                    {product.name}
                                </div>
                                <Row>
                                    {/* Ảnh sản phẩm */}
                                    <Col xl={6} lg={6} md={12}>
                                        <img src={product.image} alt={product.name} className="large"/>
                                        <div  className="gallery">
                                            {
                                            Image.map((img, index) => (
                                                <img key={index} src={img} alt="gallery"
                                                    style={{ border: selected === img ? "3px solid #15dd47" : "" }}
                                                    onClick={() => setSelected(img) }/>
                                            ))
                                            }
                                        </div>
                                        
                                    </Col>
                                    {/* Thông tin sản phẩm */}
                                    <Col xl={6} lg={6} md={12} className="info">
                                        <h1>{product.name}</h1>
                                        <table>
                                            <tr className='center'>
                                                <td>Ngày nhập</td>
                                                <td>{product.import}</td>
                                            </tr>
                                            <tr className='center'>
                                                <td>Đơn giá</td>
                                                <td>{product.price} vnđ</td>
                                            </tr>
                                            <tr>
                                                <td className='center'>Thông tin sản phẩm</td>
                                                <td>{product.description}</td>
                                            </tr>
                                        </table>
                                        <Row>
                                            <Col xl={7} lg={12}>
                                                <Row>
                                                    <Col xl={4} lg={6}>
                                                        <div style={{color:'white'}}>Tình trạng</div>
                                                        <div>
                                                            {
                                                                product.countInStock > 0 ? (
                                                                    <span className="success" style={{fontWeight: 'bold'}}>Còn hàng</span>
                                                                ) : (
                                                                    <span className="danger" style={{fontWeight: 'bold'}}>Hết hàng</span>
                                                                )
                                                            }
                                                        </div>
                                                    </Col>
                                                    <Col xl={8} lg={6}>
                                                        <FormControl variant="filled" className={classes.formControl}>
                                                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                                                Chọn số lượng
                                                            </InputLabel>
                                                                <Select
                                                                    defaultValue = "1"
                                                                    labelId="demo-simple-select-placeholder-label-label"
                                                                    id="demo-simple-select-placeholder-label"
                                                                    value={qty}
                                                                    onChange={selectNumber}
                                                                    className={classes.selectEmpty}
                                                                    required
                                                                    >
                                                                    {[...Array(Math.abs(product.countInStock)).keys()].map(
                                                                        (x) => (
                                                                        <MenuItem key={x + 1} value={x + 1}>
                                                                                {x + 1}
                                                                        </MenuItem>
                                                                        )
                                                                    )}
                                                                </Select>
                                                        </FormControl>
                                                    </Col>
                                                    
                                                </Row>
                                            </Col>
                                            <Col xl={5} lg={12}>
                                                <Button variant="contained" className="addToCart" onClick={addToCartHandler} type="submit">
                                                    Thêm vào giỏ
                                                </Button>
                                            </Col>
                                            {/* <Col lg={12} style={{marginTop: '3rem'}} className="rating-product">
                                                <lable style={{marginRight:'4.5rem'}}>Đánh giá</lable>
                                                <Rate />
                                            </Col> */}
                                            <Col lg={12} style={{ marginTop: '3rem', display: 'flex' }} className="rating-product">
                                                <Col lg={8} md={6} xs={6}>
                                                    <h2 style={{ marginRight: '4.5rem', color:'white' }}>
                                                        {
                                                        product.discount === 0 ? (
                                                            <strong>
                                                                {product.price} vnđ
                                                            </strong>
                                                            ) : (
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                Giá gốc:         
                                                                <strong style={{ textDecoration: 'line-through' }}>
                                                                    {product.price} vnđ
                                                                </strong>
                                                                Còn:        
                                                                <strong>
                                                                    {product.price - product.price * product.discount / 100} vnđ
                                                                </strong> 
                                                            </div>     
                                                        )
                                                    }
                                                    </h2>
                                                </Col>
                                                <Col lg={4} md={6} xs={6}>
                                                    {
                                                        product.discount === 0 ? (
                                                            null
                                                        ) : (
                                                            <div className="discount-span-detail">
                                                                <lable>Giảm { }-{product.discount}%</lable>
                                                            </div>    
                                                        )
                                                    }
                                                    
                                                </Col>
                                            </Col>
                                        </Row>
                                        
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '5rem'}}>
                                    {loading1 ? (
                                        <LoadingBox></LoadingBox>
                                    ) : error1 ? (
                                        <MessageBox variant="danger">{error}</MessageBox>
                                    ) : (
                                        <>
                                            <Row style={{margin: '5rem 0', fontSize: '2rem'}}>
                                                <div className="banner-titles">
                                                    <h2>Hướng dẫn sử dụng</h2> 
                                                </div>
                                            </Row>
                                                    <table className='how-to-use'
                                                        style={{ fontSize: '2rem', padding: '2rem', border:'none'}}>
                                                        <tr>Nấu chín trước khi dùng</tr>
                                                        <tr>Nơi sản xuất: Việt Nam</tr>
                                                        {
                                                            product.category === "Thịt" || product.category === "Cá"
                                                            || product.category === "Rau củ" || product.category === "Trứng"
                                                            || product.category === "Sữa" || product.category === "Nấm"
                                                            || product.category === "Hải sản" || product.category === "Đồ uống"
                                                            ||  product.category === "Làm bánh"  ? (
                                                                 <tr>Bảo quản: Bảo quản ở nhiệt độ từ 0-4 độ C</tr>   
                                                            ) : product.category === "Trái cây" || product.category === "Gia vị"
                                                            || product.category === "Đồ khô" || product.category === "Đồ hộp"
                                                            || product.category === "Fast Food" || product.category === "Hạt" ? (
                                                                <tr>Bảo quản: Bảo quản ở nhiệt độ phongf</tr>  
                                                                ) : (
                                                                 <tr>Bảo quản: Bảo quản theo hướng dẫn trên bao bì</tr>         
                                                            )
                                                        }
                                                        <tr>Hạn sử dụng: {product.expiry}</tr>
                                                        <tr>Công thức nấu ăn:<br />
                                                            MÓN THỊT THĂN BÒ SỐT RƯỢU VANG<br />
                                                            MÓN THỊT THĂN BÒ ÁP CHẢO<br />
                                                            MÓN THĂN BÒ CHIÊN KÈM TỎI <br />
                                                            MÓN THỊT THĂN BÒ KHO
                                                        ...<br /></tr>
                                                    </table>
                                        </> 
                                    )}                     
                                </Row>
                                <Row style={{margin: '5rem 0rem'}}>
                                {loading1 ? (
                                        <LoadingBox></LoadingBox>
                                    ) : error1 ? (
                                        <MessageBox variant="danger">{error}</MessageBox>
                                    ) : (
                                        <>
                                        <Row style={{margin: '5rem 0', fontSize: '2rem'}}>
                                            <div className="banner-titles">
                                                <h2>Sản phẩm tương tự</h2> 
                                            </div>
                                        </Row>
                                            <Swiper
                                                spaceBetween={20}
                                                slidesPerView={5}
                                                navigation={true}
                                                loop={true}
                                                loopFillGroupWithBlank={true}
                                                >
                                                    {   
                                                        products.filter((similarProduct) => 
                                                        similarProduct.type === product.type)
                                                        .map((filteredProduct) => (
                                                            <SwiperSlide>
                                                                <SimilarProducts key={filteredProduct}
                                                                 product={filteredProduct}></SimilarProducts>
                                                            </SwiperSlide>
                                                            )         
                                                        )                                              
                                                    }     
                                            </Swiper>                                                                
                                        </> 
                                    )}                               
                                </Row>
                                <Row>
                                    <Col xl={6} lg={6} md={12} sm={12}>
                                        <h2 style={{color: 'white'}}>Bình luận ({product.reviews.length})</h2>
                                        {
                                            product.reviews.length === 0 ? (
                                                <h2 style={{ marginTop: '2rem', color: 'white' }}>Chưa có đánh giá</h2>
                                            ) : (
                                                <ul className="reviews">
                                                    {product.reviews.map((review) => (
                                                        <li key={review._id}>
                                                        <strong>{review.name}</strong>
                                                        <Rating rating={review.rating} caption=" "></Rating>
                                                            <p>{review.createdAt.substring(0, 10)} {review.createdAt.substring(11,19)}</p>
                                                        <p>Nội dung: {review.comment}</p>
                                                        </li>
                                                    ))}
                                                </ul>   
                                            )
                                        }
                                       
                                    </Col>
                                    <Col xl={6} lg={6} md={12} sm={12}>
                                            <div>
                                                <h2 style={{color: 'white'}}>Viết nhận xét</h2>
                                            </div>
                                            {userInfo ? (
                                            <form className="write-reviews" onSubmit={submitHandler}>
                                            <Row>
                                                <Col xl={4} lg={4} md={12} sm={12}
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column'
                                                        }}>
                                            <select
                                                    style={{margin:'2rem 0'}}
                                                    id="rating"
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value="">Chọn đánh giá</option>
                                                    <option value="1">1 sao - Tệ</option>
                                                    <option value="2">2 sao - Khá</option>
                                                    <option value="3">3 sao - Tốt</option>
                                                    <option value="4">4 sao - Rất tốt</option>
                                                    <option value="5">5 sao - Tuyệt vời</option>
                                                </select>
                                                <Button variant="contained" className="addToCart"type="submit">
                                                    Gửi đánh giá
                                                </Button>
                                                </Col>
                                                <Col xl={8} lg={8} md={12} sm={12}
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            textAlign: 'center'
                                                        }}>
                                                <label htmlFor="comment">
                                                    <strong>Bình luận của bạn</strong>
                                                </label>
                                                <textarea
                                                    id="comment"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></textarea>
                                                <div>
                                                    <label>
                                                    {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                                        {errorReviewCreate && (
                                                            <MessageBox variant="danger">
                                                                {errorReviewCreate}
                                                            </MessageBox>
                                                        )} 
                                                    </label>
                                                </div>
                                                <div>
                                                </div>
                                                </Col>
                                                </Row>
                                            </form>
                                            ) : (
                                            <h2>
                                                Vui lòng <Link to="/signin">Đăng nhập</Link> để nhận xét
                                            </h2>
                                            )}
                                        </Col>

                                </Row>
                        </>
                   )        
                }
        </Container>
    )
}
