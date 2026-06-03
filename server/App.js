import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/mongoConnect.js';
import router from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors({
    origin: ['https://h-shop-production.up.railway.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/user', router);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
