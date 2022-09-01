import React from 'react'
import {Link} from 'react-router-dom'

export default function VoucherIcon() {
    return (
        <div className="voucher">
            <Link to={`/vouchers`}>
                <img src="/image/icon/gift-voucher.png" alt="voucherIcon" />
            </Link>
        </div>
    )
}
