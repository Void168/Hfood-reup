import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';


const productRouter = express.Router();
const today = Date.now();

productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const products = await Product.find({})
        res.send(products)
    })
)

productRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        await Product.remove({});
        const createdProducts = await Product.insertMany(data.products);
        res.send({ createdProducts });
    })
  );

  productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if(product){
          res.send(product);
      }else{
          res.status(404).send({
              messsage: 'Không tìm thấy sản phẩm' 
          })
      }
  }))

  productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = new Product({
        name: '',
        type: '',
        image: '',
        price: 0,
        discount: 0,
        category: '',
        expiry:'',
        countInStock: 0,
        rating: 0,
        numReview: 0,
        description: '',
        import: new Intl.DateTimeFormat('vi-VN', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today),
      });
      const createdProduct = await product.save();
      res.send({ message: 'Sản phẩm mới đã được tạo', product: createdProduct });
    })
  );

  productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) {
        product.name = req.body.name;
        product.type = req.body.type;
        product.price = req.body.price;
        product.discount = req.body.discount;
        product.image = req.body.image;
        product.category = req.body.category;
        product.expiry = req.body.expiry;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Cập nhật sản phẩm thành công', product: updatedProduct });
      } else {
        res.status(404).send({ message: 'Cập nhật sản phẩm thất bại' });
      }
    })
  );

  productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Đã xóa sản phẩm', product: deleteProduct });
      } else {
        res.status(404).send({ message: 'Không tìm thấy sản phẩm' });
      }
    })
  );

  productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'Bạn đã bình luận về sản phẩm này rồi' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Đã nhận xét',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Không tìm thấy sản phẩm' });
    }
  })
);

export default productRouter;