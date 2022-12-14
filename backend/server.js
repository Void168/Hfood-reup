/*eslint no-undef: "error"*/
/*eslint-env node*/
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import dotenv from 'dotenv';
import path from 'path';
import voucherRouter from './routers/voucherRouter.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ 
    extended: true,
}))
mongoose.connect( process.env.MONGODB_URL || 'mongodb://localhost/hfood',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.use('/api/uploads', uploadRouter);

app.use('/api/users', userRouter);

app.use('/api/products', productRouter);

app.use('/api/categories', categoryRouter);

app.use('/api/vouchers', voucherRouter);

app.use('/api/orders', orderRouter);


app.get('/api/config/paypal' ,(req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/hfood/public')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/hfood/public/index.html'))
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
})