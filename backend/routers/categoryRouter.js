import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Categories from '../models/categoryModel.js';

const categoryRouter = express.Router();

categoryRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const categories = await Categories.find({})
        res.send(categories)
    })
)

categoryRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        await Categories.remove({});
        const createdCategories = await Categories.insertMany(data.categories);
        res.send({ createdCategories });
    })
  );

  categoryRouter.get('/:id', expressAsyncHandler(async (req, res) => {
      const category = await Categories.findById(req.params.id);
      if(category){
          res.send(category);
      }else{
          res.status(404).send({
              messsage: 'Không tìm thấy danh mục' 
          })
      }
  }))

  export default categoryRouter;