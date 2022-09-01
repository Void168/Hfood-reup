import React from 'react'
import {Link} from 'react-router-dom'

export default function SearchField(props) {
    const { product } = props;
    return (
        <Link to={`/product/${product._id}`}> 
            <div key={product._id} className="item search-item">    
                {product.name}
            </div>
        </Link>
    )
}