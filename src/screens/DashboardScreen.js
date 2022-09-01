import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Col, Container, Row } from 'react-bootstrap';
import {Line} from 'react-chartjs-2'
import { detailsOrder, listOrders } from '../actions/orderActions';
import { Grid } from '@material-ui/core';

export default function DashboardScreen(props)
{
  const orderId = props.match.params.id;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const revenue = [];
  const day = [];
  const [filter, setFilter] = useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders({ admin: userInfo.isAdmin ? userInfo._id : ''}));
  }, [dispatch, userInfo._id, userInfo.isAdmin]);
  useEffect(() => {
        if(!order || (order && order._id !== orderId)){
            dispatch(detailsOrder(orderId));
        }
  }, [dispatch, orderId, order]);

    const filterMonth = (e) =>{
        setFilter(e.target.value)
  }
  console.log(day)
  return loading ?(   
        <LoadingBox></LoadingBox>
        ) : error ? ( 
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
        <Container className="section">
          <h1>Dashboard</h1>
            <Row>
                <Col lg={4}>
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <div className="dashboard">
                      Số đơn hàng đã đặt: {orders.length}
                      <br/>
                      Doanh thu tổng: {orders.reduce((a, c) => (a + c.totalPrice), 0)} vnđ
                      <br />
                      Doanh thu theo tháng: {''}
                      <select value={filter}
                        onChange={filterMonth}>
                        <option value="">Tất cả</option>
                        <option value="01">Tháng 1</option>
                        <option value="02">Tháng 2</option>
                        <option value="03">Tháng 3</option>
                        <option value="04">Tháng 4</option>
                        <option value="05">Tháng 5</option>
                        <option value="06">Tháng 6</option>
                        <option value="07">Tháng 7</option>
                        <option value="08">Tháng 8</option>
                        <option value="09">Tháng 9</option>
                        <option value="10">Tháng 10</option>
                        <option value="11">Tháng 11</option>
                        <option value="12">Tháng 12</option>
                      </select>
                      <br />
                      <br/>
                      <h3>Doanh thu tổng của tháng tính theo từng ngày và giờ</h3>
                      <br />
                      <div class="box-shadow">
                          {orders.map((order) => (
                            <div key={order._id}>
                              {
                                order.createdAt.split('T')[0].slice(5, 7) === filter ?(
                                    <>
                                      <h4 style={{display: 'none'}}>
                                            {revenue.push(order.totalPrice)} 
                                      </h4>
                                      <h4 style={{ display: 'none' }}>
                                          {day.push(order.createdAt.split('T')[0].slice(8, 10))}
                                      </h4>
                                      <div className="revenue">
                                        <Grid container spacing={2}>
                                          <Grid item lg={6}>
                                            <div   style={{borderBottom: '1px solid #c4c4c4'}}>
                                              <h4>Ngày: {order.createdAt.split('T')[0]}</h4>
                                              <h4>Giờ: {order.createdAt.split('T')[1].split('.')[0]}</h4>
                                            </div>
                                          </Grid>
                                        <Grid item lg={6} style={{ padding: "2rem", textAlign: 'center', borderBottom: '1px solid #c4c4c4' }}>
                                              <h> <i class="fas fa-long-arrow-alt-right"></i> {revenue.reduce((a, c) => a + c, 0)} vnđ</h>
                                          </Grid>
                                        </Grid>
                                      </div> 
                                    </>
                              ) : (
                              null
                                    )
                              }
                            </div>
                          )).reverse()}
                      </div>                           
                </div>
              )}
            </Col>
            <Col lg={8}>
                <h2>
                  Doanh thu tháng {filter}:
                </h2>
              {
                orders.map((order) => (
                <div key={order._id} style={{}}>
                {
                  order.createdAt.split('T')[0].slice(5, 7) === filter ? (
                    <>
                      <Line
                      data={{
                        labels: day,
                        datasets: [
                          {
                            label: "Tháng" + ' ' + order.createdAt.split('T')[0].slice(5, 7).concat(),
                            data: revenue,
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)'
                          ],
                          borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)'
                          ],
                          borderWidth: 2
                          }
                        ]
                      }}
                      height={400}
                      width={600}
                      option={{maintainAspectRatio: false}}
                          ></Line>
                    </>
                  ) : (
                            null
                  )
                }
                </div>
                ))
              }
            </Col>
          </Row>
        </Container>
    )
}