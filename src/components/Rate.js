import React, { useState } from 'react'
import {FaStar} from 'react-icons/fa'

function Rate() {
    const [rating, setRating] =useState(0)
    const [hover, setHover] = useState(null)
    return (
        <div>
            {[...Array(5)].map((star, i) =>{
                const ratingValue = i + 1;

                return <label className="rate">
                            <input type="radio" 
                            name="rating" 
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)} /> 
                            <FaStar className="star" 
                                    size={20} 
                                    color={ratingValue <= (hover || rating) ? "#ffc107" : "e4e5e9"}
                                    onMouseOver={() => setHover(ratingValue)} 
                                    onMouseOut={() => setHover(ratingValue)}/>
                        </label>
            })}
            <h2>{' '}{rating} sao</h2>
        </div>
    )
}

export default Rate



