import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connection.js';
import cookieParser from 'cookie-parser';
import { router } from './routes/index.js';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Sever is running on port ${process.env.PORT}`);
    });
  })  
  .catch((error) => console.log(error));

app.use('/api/v1', router)
app.get('/', (req, res) => {
  res.send('Hello World!');
})
