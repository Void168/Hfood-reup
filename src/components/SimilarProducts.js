import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

export default function SimilarProducts(props) {
    const { product } =props;
    return (
            <Card className="item similar-item">
                <Link to={`/product/${product._id}`}> 
                    <Card.Img variant="top" 
                            className="small" 
                            src={product.image} 
                            alt="product" />
                </Link>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title>
                            {product.name}
                        </Card.Title>
                    
                    <Card.Text>
                        <Rating rating={product.rating}
                                numReview = {product.numReview}
                        ></Rating>
                    </Card.Text>
                    <Card.Text className="price">{product.price}  vnđ</Card.Text>
                    </Link>
                </Card.Body>
            </Card>
    )
}
