import React from 'react'
import { Button, Card } from 'react-bootstrap'
export default function Vouchers(props)
{
    const { voucher } = props;
    return (
        <Card className="coupon" key={voucher._id}>
            <Card.Img variant="top"
                className="medium"
                src="/image/Avatar/sfsff.png"
                alt={voucher.code}
                style={{zIndex:'1'}}/>
            <Card.Body>
                    <Card.Title style={{marginBottom:'2rem'}}>
                    <h1>{voucher.code}</h1>
                    </Card.Title>
                <Card.Text><h2>Điều kiện: {voucher.content}</h2></Card.Text>
                <Card.Text><h2>Thời hạn: {voucher.expiry}</h2></Card.Text>
                <Button style={{
                    marginTop: '2rem',
                    backgroundColor: '#fff',
                    color: '#000',
                    width: '40%',
                    height: '20%',
                    fontSize: '1.6rem',
                    fontWeight: 'bold',
                    border: 'none',
                    boxShadow:'2px 4px 5px rgba(0, 0, 0, 0.25)'
                }}>Lưu</Button>
            </Card.Body>
        </Card>
    )
}
