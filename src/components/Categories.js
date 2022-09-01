import React from 'react'
import { Link } from 'react-router-dom';

export default function Categories(props) {
    const { category } = props;
    return (
        <li key={category._id} className="grid-item">
                    <Link to={`/category/${category._id}`}>
                        <img className="tiny" src={category.image} alt={category.name} />
                        <h3 className="category-name" >{category.name}</h3>
                    </Link>
            </li>     
    )
}
