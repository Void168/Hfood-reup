import React from 'react'
import Rating from './Rating'
import { Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function Product(props) {
    const { product } = props;
    const realPrice = product.price - product.price*(product.discount / 100);
    return (
        <Card key={product._id} className="item">
            {
                        product.discount === 0 ? (
                            null
                        ) : (
                            <span className="discount-span">
                                <Card.Text className="discount">-{product.discount}%</Card.Text>
                            </span>
                        )
                    }
            <Link to={`/product/${product._id}`}> 
                <Card.Img variant="top" 
                        className="medium" 
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
                    <Card.Text className="price">{realPrice}  vnđ</Card.Text>
                </Link>
            </Card.Body>
        </Card>
    )
}
