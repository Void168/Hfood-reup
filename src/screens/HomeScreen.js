import React, { useEffect, useState } from 'react'
import { Row, Container, Col, Carousel, Form } from 'react-bootstrap'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/LoadingBox'
import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'
import RangeSlider from 'react-bootstrap-range-slider'


export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const [visible, setVisible] = useState(20);
    const [price, setPrice] = useState(1000000)
    const [sort, setSort] = useState('newest')
    const [index, setIndex] = useState(0);

    //const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
    console.log(visible)
    const showMoreItems = () =>{
        setVisible((prevValue) => prevValue + 10)
    }
    const sortProducts = (e) =>{
        setSort(e.target.value)
    }
    const sortPrice = (a,b) =>{
        if(a.price < b.price){
            return -1
        }if(a.price > b.price){
            return 1
        }
        return 0;
    }

    const sortAlphabet = (a,b) =>{
        if(a.name < b.name){
            return - 1
        }if(a.name > b.name){
            return 1
        }
        return 0;
    }

    const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

    useEffect(() =>{
        dispatch(listProducts({}));
    }, [dispatch]);
    return (
        
            <Container fluid className="section">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                <Row>
                    <Col xl={2} lg={2} sm={12}>
                        <div className="filter">
                            <Container>
                                <div className="filter-title">Bộ lọc</div>
                                <Form style={{textAlign: 'center'}}>
                                <Form.Group>
                                        <Form.Label>
                                            Kéo để chọn mức giá
                                        </Form.Label>
                                        <RangeSlider
                                            step={50000}
                                            max="1000000"
                                            value={price}
                                            onChange={e => setPrice(e.target.value)}
                                        />
                                        </Form.Group>
                                        <h2>{price} vnđ</h2>
                                    </Form>
                            </Container>
                            <Container>
                                <div>
                                    <Form className="filter-sort">
                                        <Form.Group>
                                        <Form.Label style={{ fontSize:'1.5rem', width:'100%', padding:'0'}}>
                                            Sắp xếp
                                        </Form.Label>
                                        <select value={sort}
                                                onChange={sortProducts}>
                                                <option value="newest">Mới nhất</option>
                                                <option value="oldest">Cũ nhất</option>
                                                <option value="lowest">Thấp đến cao</option>
                                                <option value="highest">Cao đến thấp</option>
                                                <option value="AtoZ">Từ A đến Z</option>
                                                <option value="ZtoA">Từ Z đến A</option>
                                            )
                                        )
                                        </select>
                                        </Form.Group>
                                    </Form>
                                    <br/>
                                </div>
                            </Container>
                        </div>
                    </Col>
                            <Col xl={8} lg={8} sm={12}>
                                <Carousel fade
                                    activeIndex={index} onSelect={handleSelect}
                                    variant="dark">
                                    <Carousel.Item>
                                        <img
                                        className="d-block w-100"
                                        src="/image/banner/carousel1.jpg"
                                        alt="First slide"
                                        />
                                        <Carousel.Caption>
                                            <h3>First slide label</h3>
                                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                        className="d-block w-100"
                                        src="/image/banner/carousel2.jpg"
                                        alt="Second slide"
                                        />
                                        <Carousel.Caption>
                                            <h3>First slide label</h3>
                                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                        className="d-block w-100"
                                        src="/image/banner/carousel3.jpg"
                                        alt="Third slide"
                                        />
                                        <Carousel.Caption>
                                            <h3>First slide label</h3>
                                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                                <>
                                    <Col xl={2} lg={2} md={12}>
                                        <div className="filter-responsive">
                                            <Container>
                                                <div className="filter-title">Bộ lọc</div>
                                                <Form style={{textAlign: 'center'}}>
                                                <Form.Group>
                                                        <Form.Label>
                                                            Kéo để chọn mức giá
                                                        </Form.Label>
                                                        <RangeSlider
                                                            step={50000}
                                                            max="1000000"
                                                            value={price}
                                                            onChange={e => setPrice(e.target.value)}
                                                        />
                                                        </Form.Group>
                                                        <h2>{price} vnđ</h2>
                                                    </Form>
                                            </Container>
                                            <Container>
                                                <div>
                                                    <Form className="filter-sort">
                                                        <Form.Group>
                                                        <Form.Label style={{ fontSize:'2rem', width:'100%'}}>
                                                            Sắp xếp
                                                        </Form.Label>
                                                        <select value={sort}
                                                                onChange={sortProducts}>
                                                                <option value="newest">Mới nhất</option>
                                                                <option value="oldest">Cũ nhất</option>
                                                                <option value="lowest">Thấp đến cao</option>
                                                                <option value="highest">Cao đến thấp</option>
                                                                <option value="AtoZ">Từ A đến Z</option>
                                                                <option value="ZtoA">Từ Z đến A</option>
                                                            )
                                                        )
                                                        </select>
                                                        </Form.Group>
                                                    </Form>
                                                    <br/>
                                                </div>
                                            </Container>
                                        </div>
                                </Col>
                                    <Container className="list-product">
                                        <Row>
                                            {loading && <LoadingBox></LoadingBox>}
                                            {error && <MessageBox variant>{error}</MessageBox>}
                                            { 
                                            sort ==='oldest' ?(
                                                    <div>
                                                        <div className="banner-titles" style={{width:'100%'}}>
                                                            <h3 style={{color: 'white'}}>
                                                                Có {products.filter((filteredProduct) => 
                                                            filteredProduct.price <= price).length} sản phẩm
                                                            </h3>
                                                        </div>
                                                        
                                                        {
                                                            loading ? (
                                                                <LoadingBox></LoadingBox>
                                                            ) : error ? (
                                                                <MessageBox variant="danger">{error}</MessageBox>
                                                            ) : (
                                                        products.filter((filteredProduct) => 
                                                        filteredProduct.price <= price)
                                                        .slice(Math.abs(products.filter((filteredProduct) => 
                                                        filteredProduct.price <= price).length - visible), products.filter((filteredProduct) => 
                                                        filteredProduct.price <= price).length)
                                                        .map((product) => (
                                                        <Product key={product} product={product}></Product>
                                                        )) 
                                                    )}
                                                </div>
                                            ) : sort ==='lowest' ?(
                                                <div>
                                                        <div className="banner-titles" style={{width:'100%'}}>
                                                            <h3 style={{color: 'white'}}>
                                                            Có {products.filter((filteredProduct) => 
                                                            filteredProduct.price <= price).length} sản phẩm
                                                            </h3>
                                                        </div>
                                                        {
                                                            loading ? (
                                                                <LoadingBox></LoadingBox>
                                                            ) : error ? (
                                                                <MessageBox variant="danger">{error}</MessageBox>
                                                            ) : (
                                                        products.sort(sortPrice).filter((filteredProduct) => 
                                                        filteredProduct.price <= price)
                                                        .slice(0, visible)
                                                        .map((product) => (
                                                        <Product key={product} product={product}></Product>
                                                        )) 
                                                    )}
                                                </div>
                                            )  : sort ==='highest' ?(
                                                <div>
                                                        <div className="banner-titles" style={{width:'100%'}}>
                                                            <h3 style={{color: 'white'}}>
                                                            Có {products.filter((filteredProduct) => 
                                                            filteredProduct.price <= price).length} sản phẩm
                                                            </h3>
                                                        </div>
                                                        {
                                                            loading ? (
                                                                <LoadingBox></LoadingBox>
                                                            ) : error ? (
                                                                <MessageBox variant="danger">{error}</MessageBox>
                                                            ) : (
                                                        products.sort(sortPrice).reverse().filter((filteredProduct) => 
                                                        filteredProduct.price <= price)
                                                        .slice(0, visible)
                                                        .map((product) => (
                                                            <Product key={product} product={product}></Product>
                                                        )) 
                                                    )}
                                                </div>
                                            ) : sort ==='AtoZ' ?(
                                                <div>
                                                        <div className="banner-titles" style={{width:'100%'}}>
                                                            <h3 style={{color: 'white'}}>
                                                            Có {products.filter((filteredProduct) => 
                                                            filteredProduct.price <= price).length} sản phẩm
                                                            </h3>
                                                        </div>
                                                        {
                                                            loading ? (
                                                                <LoadingBox></LoadingBox>
                                                            ) : error ? (
                                                                <MessageBox variant="danger">{error}</MessageBox>
                                                            ) : (
                                                        products.sort(sortAlphabet).filter((filteredProduct) => 
                                                        filteredProduct.price <= price).slice(0, visible).map((product) => (
                                                            <Product key={product} product={product}></Product>
                                                        )) 
                                                    )}
                                                </div>
                                            ) : sort ==='ZtoA' ?(
                                                <div>
                                                        <div className="banner-titles" style={{width:'100%'}}>
                                                            <h3 style={{color: 'white'}}>
                                                            Có {products.filter((filteredProduct) => 
                                                            filteredProduct.price <= price).length} sản phẩm
                                                            </h3>
                                                        </div>
                                                        {
                                                            loading ? (
                                                                <LoadingBox></LoadingBox>
                                                            ) : error ? (
                                                                <MessageBox variant="danger">{error}</MessageBox>
                                                            ) : (
                                                        products.sort(sortAlphabet).reverse().filter((filteredProduct) => 
                                                        filteredProduct.price <= price)
                                                        .slice(0, visible)
                                                        .map((product) => (
                                                            <Product key={product} product={product}></Product>
                                                        )) 
                                                    )}
                                                </div>
                                            ) : (
                                                <div>
                                                        <div className="banner-titles" style={{width:'100%'}}>
                                                            <h3 style={{color: 'white'}}>
                                                            Có {products.filter((filteredProduct) => 
                                                            filteredProduct.price <= price).length} sản phẩm
                                                            </h3>
                                                        </div>
                                                        {
                                                            loading ? (
                                                                <LoadingBox></LoadingBox>
                                                            ) : error ? (
                                                                <MessageBox variant="danger">{error}</MessageBox>
                                                            ) : (
                                                        products.filter((filteredProduct) => 
                                                        filteredProduct.price <= price)
                                                        .slice(Math.abs(products.filter((filteredProduct) => 
                                                        filteredProduct.price <= price).length - visible), products.filter((filteredProduct) => 
                                                        filteredProduct.price <= price).length)
                                                        .reverse()
                                                        .map((product) => (
                                                        <Product key={product} product={product}></Product>
                                                        )) 
                                                    )}
                                                </div>
                                            )
                                        }                                                                       
                                        </Row>
                                        <Col className="loadmore" style={{textAlign: 'center'}}>
                                                {
                                                price === 0 ? (
                                                    <div style={{height: '300px', paddingTop:'17%'}}>
                                                            <h1 style={{
                                                                color: 'orange',
                                                                fontWeight: 'bold',
                                                            }}>
                                                                Bạn hãy điều chỉnh lại giá nhé</h1>
                                                    </div>
                                                ) : products.filter((filteredProduct) => filteredProduct.price <= price).length <= visible ? (
                                                        null
                                            ) : (
                                                    <button onClick={showMoreItems} >
                                                        Xem thêm
                                                    </button>
                                                    )
                                                    
                                            }
                                            
                                        </Col>
                                        
                                    </Container>
                                </> 
                            
                        </Col>
                    <Col xl={2} lg={2} md={12} sm={12}>
                        {/* <div className="banner">
                            <Row>
                                <Col xl={12} lg={12} md={6} sm={6} xs={6}>
                                <img src="/image/banner/ad1.jpg" alt="ad1"/>
                                </Col>
                                <Col xl={12} lg={12} md={6} sm={6} xs={6}>
                                    <img src="/image/banner/ad2.jpg" alt="ad2"/>
                                </Col>
                            </Row>
                        </div> */}
                    </Col>
                </Row>
                )}
            </Container>
    )
}