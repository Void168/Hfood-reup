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
      window.alert('G???i nh???n x??t th??nh c??ng');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    } if (errorReviewCreate)
    {
        window.alert('B???n ???? nh???n x??t s???n ph???m n??y r???i');
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
      alert('H??y b??nh lu???n v?? ch???n s??? sao');
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
                                    Trang ch??? <i class="fas fa-caret-right"></i> 
                                    S???n ph???m <i class="fas fa-caret-right"></i>
                                    {product.category} <i class="fas fa-caret-right"></i>
                                    {product.type} <i class="fas fa-caret-right"></i>
                                    {product.name}
                                </div>
                                <Row>
                                    {/* ???nh s???n ph???m */}
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
                                    {/* Th??ng tin s???n ph???m */}
                                    <Col xl={6} lg={6} md={12} className="info">
                                        <h1>{product.name}</h1>
                                        <table>
                                            <tr className='center'>
                                                <td>Ng??y nh???p</td>
                                                <td>{product.import}</td>
                                            </tr>
                                            <tr className='center'>
                                                <td>????n gi??</td>
                                                <td>{product.price} vn??</td>
                                            </tr>
                                            <tr>
                                                <td className='center'>Th??ng tin s???n ph???m</td>
                                                <td>{product.description}</td>
                                            </tr>
                                        </table>
                                        <Row>
                                            <Col xl={7} lg={12}>
                                                <Row>
                                                    <Col xl={4} lg={6}>
                                                        <div style={{color:'white'}}>T??nh tr???ng</div>
                                                        <div>
                                                            {
                                                                product.countInStock > 0 ? (
                                                                    <span className="success" style={{fontWeight: 'bold'}}>C??n h??ng</span>
                                                                ) : (
                                                                    <span className="danger" style={{fontWeight: 'bold'}}>H???t h??ng</span>
                                                                )
                                                            }
                                                        </div>
                                                    </Col>
                                                    <Col xl={8} lg={6}>
                                                        <FormControl variant="filled" className={classes.formControl}>
                                                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                                                Ch???n s??? l?????ng
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
                                                    Th??m v??o gi???
                                                </Button>
                                            </Col>
                                            {/* <Col lg={12} style={{marginTop: '3rem'}} className="rating-product">
                                                <lable style={{marginRight:'4.5rem'}}>????nh gi??</lable>
                                                <Rate />
                                            </Col> */}
                                            <Col lg={12} style={{ marginTop: '3rem', display: 'flex' }} className="rating-product">
                                                <Col lg={8} md={6} xs={6}>
                                                    <h2 style={{ marginRight: '4.5rem', color:'white' }}>
                                                        {
                                                        product.discount === 0 ? (
                                                            <strong>
                                                                {product.price} vn??
                                                            </strong>
                                                            ) : (
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                Gi?? g???c:         
                                                                <strong style={{ textDecoration: 'line-through' }}>
                                                                    {product.price} vn??
                                                                </strong>
                                                                C??n:        
                                                                <strong>
                                                                    {product.price - product.price * product.discount / 100} vn??
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
                                                                <lable>Gi???m { }-{product.discount}%</lable>
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
                                                    <h2>H?????ng d???n s??? d???ng</h2> 
                                                </div>
                                            </Row>
                                                    <table className='how-to-use'
                                                        style={{ fontSize: '2rem', padding: '2rem', border:'none'}}>
                                                        <tr>N???u ch??n tr?????c khi d??ng</tr>
                                                        <tr>N??i s???n xu???t: Vi???t Nam</tr>
                                                        {
                                                            product.category === "Th???t" || product.category === "C??"
                                                            || product.category === "Rau c???" || product.category === "Tr???ng"
                                                            || product.category === "S???a" || product.category === "N???m"
                                                            || product.category === "H???i s???n" || product.category === "????? u???ng"
                                                            ||  product.category === "L??m b??nh"  ? (
                                                                 <tr>B???o qu???n: B???o qu???n ??? nhi???t ????? t??? 0-4 ????? C</tr>   
                                                            ) : product.category === "Tr??i c??y" || product.category === "Gia v???"
                                                            || product.category === "????? kh??" || product.category === "????? h???p"
                                                            || product.category === "Fast Food" || product.category === "H???t" ? (
                                                                <tr>B???o qu???n: B???o qu???n ??? nhi???t ????? phongf</tr>  
                                                                ) : (
                                                                 <tr>B???o qu???n: B???o qu???n theo h?????ng d???n tr??n bao b??</tr>         
                                                            )
                                                        }
                                                        <tr>H???n s??? d???ng: {product.expiry}</tr>
                                                        <tr>C??ng th???c n???u ??n:<br />
                                                            M??N TH???T TH??N B?? S???T R?????U VANG<br />
                                                            M??N TH???T TH??N B?? ??P CH???O<br />
                                                            M??N TH??N B?? CHI??N K??M T???I <br />
                                                            M??N TH???T TH??N B?? KHO
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
                                                <h2>S???n ph???m t????ng t???</h2> 
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
                                        <h2 style={{color: 'white'}}>B??nh lu???n ({product.reviews.length})</h2>
                                        {
                                            product.reviews.length === 0 ? (
                                                <h2 style={{ marginTop: '2rem', color: 'white' }}>Ch??a c?? ????nh gi??</h2>
                                            ) : (
                                                <ul className="reviews">
                                                    {product.reviews.map((review) => (
                                                        <li key={review._id}>
                                                        <strong>{review.name}</strong>
                                                        <Rating rating={review.rating} caption=" "></Rating>
                                                            <p>{review.createdAt.substring(0, 10)} {review.createdAt.substring(11,19)}</p>
                                                        <p>N???i dung: {review.comment}</p>
                                                        </li>
                                                    ))}
                                                </ul>   
                                            )
                                        }
                                       
                                    </Col>
                                    <Col xl={6} lg={6} md={12} sm={12}>
                                            <div>
                                                <h2 style={{color: 'white'}}>Vi???t nh???n x??t</h2>
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
                                                    <option value="">Ch???n ????nh gi??</option>
                                                    <option value="1">1 sao - T???</option>
                                                    <option value="2">2 sao - Kh??</option>
                                                    <option value="3">3 sao - T???t</option>
                                                    <option value="4">4 sao - R???t t???t</option>
                                                    <option value="5">5 sao - Tuy???t v???i</option>
                                                </select>
                                                <Button variant="contained" className="addToCart"type="submit">
                                                    G???i ????nh gi??
                                                </Button>
                                                </Col>
                                                <Col xl={8} lg={8} md={12} sm={12}
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            textAlign: 'center'
                                                        }}>
                                                <label htmlFor="comment">
                                                    <strong>B??nh lu???n c???a b???n</strong>
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
                                                Vui l??ng <Link to="/signin">????ng nh???p</Link> ????? nh???n x??t
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
