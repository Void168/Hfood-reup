import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteProduct, listProducts, createProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';
import {Container, Row, Col, Form} from 'react-bootstrap'
import { listCategories } from '../actions/categoryActions';

export default function ProductListScreen(props)
{
  const {pageNumber = 1 } = useParams()
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [visible, setVisible] = useState(5);
  const [filter, setFilter] = useState('')

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({pageNumber})
    );
  }, [
    dispatch,
    props.history,
    successDelete,
    pageNumber,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('Bạn muốn xóa sản phẩm này?')) {
      dispatch(deleteProduct(product._id));
    }
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ admin: userInfo.isAdmin ? userInfo._id : '', pageNumber })
    );
  }, [
    userInfo.isAdmin,
    createdProduct,
    dispatch,
    props.history,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  useEffect(() =>{
        dispatch(listCategories({}));
    },[dispatch]);

  const createHandler = () => {
    dispatch(createProduct());
  };

  const showMoreItems = () =>{
        setVisible((prevValue) => prevValue + 5)
  }
  
  const filterProducts = (e) =>{
        setFilter(e.target.value)
    }

  return (
    <Container className="section">
      <Row>
        <h1>Danh sách sản phẩm</h1>
      </Row>
      <Col lg={12} className="create-product" style={{textAlign: 'center'}}>
        
          <button type="button" 
                  style={{marginBottom:'3rem'}}
                  onClick={(createHandler)
                  }>Tạo sản phẩm
          </button>
      </Col>
      
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      
      
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">Hãy điền thông tin cho sản phẩm mới</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
          <>
              <h1>Có {products.length} sản phẩm</h1>
              <Form className="filter-sort">
                <Form.Group>
                  <Form.Label style={{ fontSize:'2rem', width:'100%'}}>
                    Sắp xếp
                  </Form.Label>
                    <select value={filter}
                    onChange={filterProducts}>
                      <option value="">Tất cả</option>
                      {/* {
                      categories.map((category) => (
                        <option value={category.name}>
                          {category.name}
                        </option>
                        ))
                      } */
                      <>
                        <option value="Meat">Thịt</option>
                        <option value="Fish">Cá</option>
                        <option value="Vegetable">Rau củ</option>
                        <option value="Egg">Trứng</option>
                        <option value="Fruit">Trái cây</option>
                        <option value="Spice">Gia vị</option>
                        <option value="Nuts">Hạt</option>
                        <option value="Bake">Làm bánh</option>
                        <option value="Milk">Sữa</option>
                        <option value="Mushroom">Nấm</option>
                        <option value="SeaFood">Hải sản</option>
                        <option value="Dried">Đồ khô</option>
                        <option value="Drinks">Đồ uống</option>
                        <option value="Canned">Đồ hộp</option>
                        <option value="FastFood">Fast Food</option>
                        <option value="Import">Nhập khẩu</option>
                      </>
                    }
                    </select>
                  </Form.Group>
              </Form>
              <table className="table" style={{fontSize:'2rem'}}>
                  <tr className="center">
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Danh mục</th>
                    <th>Ghi chú</th>
                  </tr>
                    <tbody>
                  {filter === "Meat" ? (
                    products
                        .filter((filteredProduct) => filteredProduct.category === "Thịt")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                  ) : filter === "Fish" ? (
                    products
                        .filter((filteredProduct) => filteredProduct.category === "Cá")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                    ) : filter === "Vegetable" ? (
                    products
                        .filter((filteredProduct) => filteredProduct.category === "Rau củ")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                      ) : filter === "Egg" ? (
                    products
                        .filter((filteredProduct) => filteredProduct.category === "Trứng")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                      ) : filter === "Fruit" ? (
                    products
                       .filter((filteredProduct) => filteredProduct.category === "Trái cây")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                      ) : filter === "Spice" ? (
                    products
                        .filter((filteredProduct) => filteredProduct.category === "Gia vị")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                      ) : filter === "Nuts" ? (
                    products
                        .filter((filteredProduct) => filteredProduct.category === "Hạt")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                      ) : filter === "Bake" ? (
                    products
                       .filter((filteredProduct) => filteredProduct.category === "Làm bánh")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                      ) : filter === "Milk" ? (
                    products
                        .filter((filteredProduct) => filteredProduct.category === "Sữa")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                      ) : filter === "Mushroom" ? (
                    products
                        .filter((filteredProduct) => filteredProduct.category === "Nấm")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                      ) : filter === "SeaFood" ? (
                    products
                        .filter((filteredProduct) => filteredProduct.category === "Hải sản")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center"> 
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                      ): filter === "Dried" ? (
                    products
                        .filter((filteredProduct) => filteredProduct.category === "Đồ khô")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                      ) : filter === "Drinks" ? (
                    products
                        .filter((filteredProduct) => filteredProduct.category === "Đồ uống")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                      ) : filter === "Canned" ? (
                    products
                       .filter((filteredProduct) => filteredProduct.category === "Đồ hộp")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td >
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                      ) : filter === "FastFood" ? (
                    products
                        .filter((filteredProduct) => filteredProduct.category === "Fast Food")
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                      ): filter === "Import" ? (
                    products
                        .slice(0, visible)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()
                      ) : (
                        products
                        .slice(products.length - visible*2, products.length)
                        .map((product) => (
                          <tr key={product._id} className="center">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} vnđ</td>
                            <td>{product.category}</td>
                            <td style={{paddingBottom:'2rem'}}>
                              <button
                                type="button"
                                className="update btn-actions"
                                onClick={() =>
                                  props.history.push(`productlist/${product._id}/edit`)
                                }
                              >
                                Sửa
                              </button><br/>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(product)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        )).reverse()                  
                      )
                    }
                </tbody>
              </table>
              <Col className="loadmore" style={{ textAlign: 'center' }}>
                {
                  visible < products.length &&
                  <button onClick={showMoreItems} >
                  Xem thêm
                  </button>
                }
              </Col>
          </>
        )}
    </Container>
  );
}