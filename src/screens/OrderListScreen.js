import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import {Container} from 'react-bootstrap'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderListScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [filter, setFilter] = useState('')
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders({ admin: userInfo.isAdmin ? userInfo._id : ''}));
  }, [dispatch, successDelete, userInfo._id, userInfo.isAdmin]);
  
  const deleteHandler = (order) => {
    if (window.confirm('Bạn có chắc chắn xóa đơn hàng này?')) {
      dispatch(deleteOrder(order._id));
    }
  };

    const paymentMethod = (e) =>{
        setFilter(e.target.value)
  }
  return (
    <Container className="section">
      <h1>Danh sách đơn hàng</h1>
      Phương thức thanh toán: {''}
      <select value={filter}
                        onChange={paymentMethod}>
                        <option value="">Tất cả</option>
                        <option value="CoD">Thanh toán khi giao hàng</option>
                        <option value="PayPal">Chuyển khoản</option>
      </select>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr class="center">
              <th>Mã đơn hàng</th>
              <th>Người đặt</th>
              <th>Ngày đặt</th>
              <th>Tổng trả</th>
              <th>Thanh toán</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
                {filter === "CoD" ? (
                  orders.filter((filterPayment) => filterPayment.paymentMethod === "CoD")
                    .map((order) => (
              <tr key={order._id} className="center">
                {
                  <>
                  <td>{order._id}</td>
                    <td>{order.user}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(0)} vnđ</td>
                    <td>{order.isPaid ? order.paidAt : 'Chưa thanh toán'}</td>
                    <td>
                      <button
                        type="button"
                        className="details btn-actions"
                        onClick={() => {
                          props.history.push(`/order/${order._id}`);
                        }}
                      >
                        Chi tiết
                      </button>
                      <button
                        type="button"
                        className="delete btn-actions"
                        onClick={() => deleteHandler(order)}
                      >
                        Hủy đơn hàng
                      </button>
                    </td>
                </>
              } 
              </tr>
              )).reverse()
                ) :  filter === "PayPal" ? (
                    orders.filter((filterPayment) => filterPayment.paymentMethod === "PayPal")
                      .map((order) => (
              <tr key={order._id} className="center">
                {
                  <>
                  <td>{order._id}</td>
                    <td>{order.user}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(0)} vnđ</td>
                    <td>{order.isPaid ? order.paidAt : 'Chưa thanh toán'}</td>
                    <td>
                      <button
                        type="button"
                        className="details btn-actions"
                        onClick={() => {
                          props.history.push(`/order/${order._id}`);
                        }}
                      >
                        Chi tiết
                      </button>
                      <button
                        type="button"
                        className="delete btn-actions"
                        onClick={() => deleteHandler(order)}
                      >
                        Hủy đơn hàng
                      </button>
                    </td>
                </>
              } 
              </tr>
              )).reverse()
                  ) : (
                  orders.map((order) => (
                      <tr key={order._id} className="center">
                        {
                          <>
                          <td>{order._id}</td>
                            <td>{order.user}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice.toFixed(0)} vnđ</td>
                            <td>{order.isPaid ? order.paidAt : 'Chưa thanh toán'}</td>
                            <td>
                              <button
                                type="button"
                                className="details btn-actions"
                                onClick={() => {
                                  props.history.push(`/order/${order._id}`);
                                }}
                              >
                                Chi tiết
                              </button>
                              <button
                                type="button"
                                className="delete btn-actions"
                                onClick={() => deleteHandler(order)}
                              >
                                Hủy đơn hàng
                              </button>
                            </td>
                        </>
                      } 
                      </tr>
                      )).reverse()
                )
            }
          </tbody>
        </table>
      )}
    </Container>
  );
}