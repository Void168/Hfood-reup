import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Vouchers from '../models/voucherModel.js';

const voucherRouter = express.Router();

voucherRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const vouchers = await Vouchers.find({})
        res.send(vouchers)
    })
)

voucherRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        await Vouchers.remove({});
        const createdVouchers = await Vouchers.insertMany(data.vouchers);
        res.send({ createdVouchers });
    })
  );

  voucherRouter.get('/:id', expressAsyncHandler(async (req, res) => {
      const voucher = await Vouchers.findById(req.params.id);
      if(voucher){
          res.send(voucher);
      }else{
          res.status(404).send({
              messsage: 'Không tìm thấy voucher' 
          })
      }
  }))

  export default voucherRouter;