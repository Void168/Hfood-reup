import React, { useEffect } from 'react'
import {Container, Col, Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrderMine, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderHistoryScreen(props) {
const orderMineList = useSelector((state) => state.orderMineList);
const { loading, error, orders } = orderMineList;
const orderDelete = useSelector((state) => state.orderDelete);
const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
} = orderDelete;
const userSignin = useSelector((state) => state.userSignin);
const { userInfo } = userSignin;
const dispatch = useDispatch();
useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
    
    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });
        dispatch(listOrders({ user: userInfo ? userInfo._id : ''}));
    }, [dispatch, successDelete, userInfo._id, userInfo]);
    
    const deleteHandler = (order) => {
        if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
            dispatch(deleteOrder(order._id));
            window.alert('Đã hủy đơn hàng');
            window.location.reload();
        }
    };

    return (
        <Container className="section">
            <Row>
                <Col lg={12}>
                    {loadingDelete && <LoadingBox></LoadingBox>}
                    {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
                        <h1>Lịch sử mua hàng</h1>
                        {loading ? (
                            <LoadingBox></LoadingBox>
                        ) : error ? (
                            <MessageBox variant="danger">{error}</MessageBox>
                        ) : (
                        <table className="table">
                            <thead>
                                <tr className="center">
                                <th>Mã đơn hàng</th>
                                <th>Ngày tạo</th>
                                <th>Tổng trả</th>
                                <th>Thanh toán</th>
                                <th>Vận chuyển</th>
                                <th>Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody className="center">
                                {
                                    orders
                                    .map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>
                                            {
                                                order.createdAt.substring(0, 10)
                                            }
                                        </td>
                                        <td>{order.totalPrice.toFixed(0)} vnđ</td>
                                        <td>{order.isPaid ? order.paidAt : 'Chưa thanh toán'}</td>
                                        <td>
                                        {order.isDelivered
                                            ? order.deliveredAt.substring(0, 10)
                                            : 'Chưa vận chuyển'}
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn-details"
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
                                    </tr>
                                    )).reverse()
                            }
                            </tbody>
                        </table>
                        )
                    }
                </Col>
            </Row>
        </Container>
    )
}
