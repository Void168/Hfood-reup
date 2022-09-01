  
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import {Container} from 'react-bootstrap'
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET, PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { TextField, Grid } from '@material-ui/core';
import { listCategories } from '../actions/categoryActions';

export default function ProductEditScreen(props) {

  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [expiry, setExpiry] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/productlist');
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDiscount(product.discount);
      setImage(product.image);
      setCategory(product.category);
      setExpiry(product.expiry);
      setType(product.type);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  useEffect(() =>{
        dispatch(listCategories({}));
    },[dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        discount,
        image,
        category,
        expiry,
        type,
        countInStock,
        description,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

      const selectCategory = (e) =>
    {
        setCategory(e.target.value)
    }


  return (
    <Container className="section">
      <div className="banner-titles" style={{marginBottom:'2rem'}}>
        <h1 style={{color: 'white'}}>Sửa thông tin sản phẩm</h1>
      </div>
      <form className="update-form" onSubmit={submitHandler} style={{ padding: '2rem 5rem' }}>
        <div>
          <h1>Mã sản phẩm: {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
              <div>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                      <TextField id="standard-basic"
                        type="text"
                        label="Tên sản phẩm"
                        placeholder="Nhập tên sản phẩm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                  </Grid>
                  {
                    price < 0 ? (
                      <Grid item lg={6}>
                        <h2 style={{color: 'red'}}>Giá sản phẩm không được là số âm</h2>
                      <TextField id="standard-basic"
                      type="number"
                      label="Giá sản phẩm"
                      placeholder="Nhập tên sản phẩm"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      />
                    </Grid>
                    ) : (
                      <Grid item lg={6}>
                        <TextField id="standard-basic"
                        type="number"
                        label="Giá sản phẩm"
                        placeholder="Nhập tên sản phẩm"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        />
                      </Grid>
                    )
                  }
                  <Grid item lg={6}>
                    <TextField id="standard-basic"
                    type="text"
                    label="Ảnh sản phẩm"
                    placeholder="Tải ảnh lên"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <input
                      type="file"
                      id="imageFile"
                      label="Chọn ảnh"
                      onChange={uploadFileHandler}
                    ></input>
                    {loadingUpload && <LoadingBox></LoadingBox>}
                    {errorUpload && (
                      <MessageBox variant="danger">{errorUpload}</MessageBox>
                    )}
                  </Grid>
                  <Grid item lg={6}>
                    <TextField id="standard-basic"
                    type="text"
                    label="Loại"
                    placeholder="Loại sản phẩm"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                    />
                  </Grid>
                  <Grid item lg={6} style={{display: 'flex', flexDirection:'row'}}>
                    <Grid item lg={6} style={{textAlign: 'center'}}>
                      <label>Danh mục</label>
                    </Grid>
                    <Grid item lg={6}>
                        <select value={category}
                        onChange={selectCategory}
                      style={{fontSize: '2rem', width: '50%'}}>
                          <option value="">Tất cả</option>
                          <>
                            <option value="Thịt">Thịt</option>
                            <option value="Cá">Cá</option>
                            <option value="Rau củ">Rau củ</option>
                            <option value="Trứng">Trứng</option>
                            <option value="Trái cây">Trái cây</option>
                            <option value="Gia vị">Gia vị</option>
                            <option value="Hạt">Hạt</option>
                            <option value="Làm bánh">Làm bánh</option>
                            <option value="Sữa">Sữa</option>
                            <option value="Nấm">Nấm</option>
                            <option value="Hải sản">Hải sản</option>
                            <option value="Đồ khô">Đồ khô</option>
                            <option value="Đồ uống">Đồ uống</option>
                            <option value="Đồ hộp">Đồ hộp</option>
                            <option value="Fast Food">Fast Food</option>
                            <option value="Nhập khẩu">Nhập khẩu</option>
                          </>
                        </select>
                    </Grid>
                    
                  </Grid>
                  {
                    countInStock < 0 ? (
                      <Grid item lg={6}>
                        <h2 style={{color: 'red'}}>Số lượng không được là số âm</h2>
                        <TextField id="standard-basic"
                        type="text"
                        label="Trong kho"
                        placeholder="Số lượng"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        required
                        />
                      </Grid>
                    ) : (
                    <Grid item lg={6}>
                      <TextField id="standard-basic"
                      type="text"
                      label="Trong kho"
                      placeholder="Số lượng"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      required
                      />
                    </Grid>
                    )
                  } 
                  <Grid item lg={6}>
                    <TextField id="standard-basic"
                    type="text"
                    label="Hạn sử dụng"
                    placeholder="Nhập ngày"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    required
                    />
                  </Grid>
                  {
                    discount < 0 ? (
                      <Grid item lg={12}>
                        <h2 style={{color: 'red'}}>Mức giảm giá phải lớn hơn hoặc bằng 0</h2>
                        <TextField id="standard-basic"
                        type="number"
                        label="Giảm giá"
                        placeholder="Nhập mức giảm (Đơn vị %)"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        required
                        />
                      </Grid>
                    ): (
                      <Grid item lg={12}>
                        <TextField id="standard-basic"
                        type="number"
                        label="Giảm giá"
                        placeholder="Nhập mức giảm (Đơn vị %)"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        required
                        />
                      </Grid>
                    )
                  }
                  
                </Grid>
            <div>
              <label htmlFor="description">Mô tả</label><br/>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Nhập mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style ={{height:'300px', border:'1px solid #c4c4c4'}}
              ></textarea>
            </div>
            <div style={{textAlign:"center"}}>
              <label></label>
              <button type="submit">
                Cập nhật
              </button>
            </div>
          </div>
        )}
      </form>
    </Container>
  );
}