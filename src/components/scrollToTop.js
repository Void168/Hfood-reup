import React, {useEffect, useState} from 'react'
import { useWindowScroll } from 'react-use'

const ScrollToTop = () => {
    const { y: pageYOffset } = useWindowScroll();
    const [visible, setVisibility] = useState(false);

    useEffect(() =>{
        if(pageYOffset > 400){
            setVisibility(true)
        }else{
            setVisibility(false)
        }
    }, [pageYOffset])

    const scrollToTop = () => window.scrollTo(
        {
            top: 0, 
            behavior: "smooth"
        }
    )

    if(!visible){
        return false;
    }

    return (
        <div className="scrollToTop" onClick={scrollToTop}>
            <img src="/image/icon/1041355.png" alt="scrollToTop" />
        </div>
    )
};

export default ScrollToTop