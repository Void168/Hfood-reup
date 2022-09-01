import React, { useEffect, useState } from 'react'
import { Row, Container, Col, Form } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { detailsCategory } from '../actions/categoryActions'
import RangeSlider from 'react-bootstrap-range-slider'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/LoadingBox'
import Product from '../components/Product'

export default function CategoryScreen(props) {
    const categoryId = props.match.params.id
    const [price, setPrice] = useState(1000000)
    
    const categoryDetails = useSelector(state => state.categoryDetails);
    const { category, loading, error } = categoryDetails;
    const productList = useSelector((state) => state.productList);
    const { loading1, error1, products } = productList;
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(20);
    const [sort, setSort] = useState('newest')

    const showMoreItems = () =>{
        setVisible((prevValue) => prevValue + 8)
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
            return -1
        }if(a.name > b.name){
            return 1
        }
        return 0;
    }

    useEffect(() =>{
        dispatch(detailsCategory(categoryId));
    }, [dispatch, categoryId])

    useEffect(() =>{
        dispatch(listProducts({}));
    },[dispatch]);
    return (
            <Container fluid className="section">
                <Row>
                    <Col lg={2}>
                        <div className="filter">
                        <Container>
                                <div className="filter-title">Bộ lọc</div>
                                <Form style={{textAlign: 'center'}}>
                                    <Form.Group>
                                        <Form.Label>
                                            Kéo để chọn mức giá
                                        </Form.Label>
                                        <RangeSlider
                                            step={100000}
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
                        <Col lg={8}>
                            {loading ? (
                                <LoadingBox></LoadingBox>
                            ) : error ? (
                                <MessageBox variant="danger">{error}</MessageBox>
                            ) : (
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
                                                                step={100000}
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
                                        <img style={{width:'64px', height:'64px'}}
                                         src={category.image} alt={category.name}/>
                                        <strong style={{marginLeft:'1rem'}}>{category.name}</strong>
                                        <Row>
                                            <div className="banner-titles" style={{width:'100%'}}>
                                                <h2>
                                                Có {products.filter((similarCategory2) => 
                                                similarCategory2.category === category.name 
                                                && similarCategory2.price <= price).length} sản phẩm
                                                </h2>
                                            </div>
                                            
                                        {loading1 ? (
                                            <LoadingBox></LoadingBox>
                                        ) : error1 ? (
                                            <MessageBox variant="danger">{error}</MessageBox>
                                        ) : sort ==='oldest' ?( 
                                                products.filter((similarCategory2) => 
                                                similarCategory2.category === category.name 
                                                && similarCategory2.price <= price)
                                                .slice(0, visible)
                                                .map((filteredCategory) => (
                                                <Product key={filteredCategory} 
                                                product={filteredCategory}></Product>
                                                )
                                            )) : sort ==='lowest' ?(
                                                products.sort(sortPrice).filter((similarCategory3) => 
                                                similarCategory3.category === category.name 
                                                && similarCategory3.price <= price)
                                                .slice(0, visible)
                                                .map((filteredCategory) => (
                                                <Product key={filteredCategory} 
                                                product={filteredCategory}></Product>
                                                )
                                            )) : sort ==='highest' ?(
                                                products.sort(sortPrice).reverse().filter((similarCategory4) => 
                                                similarCategory4.category === category.name 
                                                && similarCategory4.price <= price)
                                                .slice(0, visible)
                                                .map((filteredCategory) => (
                                                <Product key={filteredCategory} 
                                                product={filteredCategory}></Product>
                                                )
                                            )) : sort ==='AtoZ' ? (
                                                products.sort(sortAlphabet).filter((similarCategory5) => 
                                                similarCategory5.category === category.name 
                                                && similarCategory5.price <= price)
                                                .slice(0, visible)
                                                .map((filteredCategory) => (
                                                <Product key={filteredCategory} 
                                                product={filteredCategory}></Product>
                                                )
                                            )) : sort ==='ZtoA' ?(
                                                products.sort(sortAlphabet).reverse().filter((similarCategory6) => 
                                                similarCategory6.category === category.name 
                                                && similarCategory6.price <= price)
                                                .slice(0, visible)
                                                .map((filteredCategory) => (
                                                <Product key={filteredCategory} 
                                                product={filteredCategory}></Product>
                                                )
                                            )) : (
                                                products.filter((similarCategory) => 
                                                similarCategory.category === category.name 
                                                && similarCategory.price <= price)
                                                .reverse()
                                                .slice(0, visible)
                                                .map((filteredCategory) => (
                                                <Product key={filteredCategory} 
                                                product={filteredCategory}></Product>
                                                )
                                            ))
                                        }                                                                       
                                        </Row>
                                        <Row className="loadmore">
                                                {   
                                                    visible < products.filter((similarCategory) => 
                                                    similarCategory.category === category.name &&
                                                    similarCategory.price <= price ).length &&
                                                    <button onClick={showMoreItems} >
                                                    Xem thêm
                                                    </button>  
                                                }
                                        </Row>
                                    </Container>
                                </> 
                            )}
                        </Col>
                        <Col xl={2} lg={2} md={12} sm={12}>
                        <div className="banner">
                            <Row>
                                <Col xl={12} lg={12} md={6} sm={6} xs={6}>
                                <img src="/image/banner/ad1.jpg" alt="ad1"/>
                                </Col>
                                <Col xl={12} lg={12} md={6} sm={6} xs={6}>
                                    <img src="/image/banner/ad2.jpg" alt="ad2"/>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
    )
}