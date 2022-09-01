import React, { useEffect } from 'react'
import {Container} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { listVouchers } from '../actions/voucherActions.js';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/LoadingBox';
import Vouchers from '../components/Vouchers.js'

export default function VoucherScreen()
{
    const dispatch = useDispatch();
    const voucherList = useSelector((state) => state.voucherList);
    const { loading, error, vouchers } = voucherList;

    useEffect(() =>{
        dispatch(listVouchers({}));
    }, [dispatch]);

    return (
        <Container className="section">
            <div className="container voucher-kinds">
                <button className="red">
                    <h2>Theo mặt hàng</h2>
                </button>
                <button className="yellow">
                    <h2>Theo loại hàng</h2>
                </button>
                <button className="green">
                    <h2>Đã hết hạn</h2>
                </button>
                <button className="blue">
                    <h2>Áp dụng sắp tới</h2>
                </button>
            </div>
            {loading ? (
                <LoadingBox></LoadingBox>
                    ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                    vouchers.map((voucher) => (
                        <Vouchers key={voucher} voucher={voucher}></Vouchers>
                    ))
                )
            }
        </Container>
    )
}
