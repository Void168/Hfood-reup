import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {InputGroup, FormControl, Button, Dropdown} from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/LoadingBox'
import SearchField from '../components/SearchField'
import OutsideClickHandler from 'react-outside-click-handler'

export default function SearchBox(props) {
    const [hidden, setHidden] = useState(true)
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    useEffect(() =>{
        dispatch(listProducts({}));
    },[dispatch]);

    const FilterHandler = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = products.filter((product) => {
          return product.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredData([]);
          } else {
            setFilteredData(newFilter);
          }
        };
    return (
        <div>
            <OutsideClickHandler 
                onOutsideClick={() =>setHidden(true)} 
                style={{height: '200px'}}>
                <InputGroup className="mb-3" onClick={() => setHidden(!hidden)}>
                    <FormControl className="search-box"
                    placeholder="Tìm kiếm sản phẩm (gõ Tiếng Việt có dấu)"
                    aria-label="searchbox"
                    aria-describedby="search"
                    value={wordEntered}
                    onChange={FilterHandler}
                    />
                    <Button variant="outline-secondary">
                        <i class="fas fa-search"></i>
                    </Button>
                    {
                        filteredData.length !==0 &&
                        (
                            !hidden && (
                                <Dropdown className="items-search">
                                    { 
                                    (
                                        loading ? (
                                        <LoadingBox></LoadingBox>
                                    ) : error ? (
                                        <MessageBox variant="danger">{error}</MessageBox>
                                    ) : (
                                        <>
                                            {  (filteredData.map((product) => (
                                                <SearchField key={product._id} product={product}></SearchField>) 
                                            ))}                                                                       
                                        </> 
                                        )
                                    )}
                                </Dropdown>
                            )
                        )
                    }
                    
                    
                </InputGroup>     
            </OutsideClickHandler> 
        </div>
    )
}