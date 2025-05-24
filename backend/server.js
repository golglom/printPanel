import express from 'express';
import connectDB from './config/mongo.js';
import authRouter from './routes/auth.js';
import materialRouter from './routes/materials.js';
import productRouter from './routes/products.js';
import clientRouter from './routes/clients.js';
import userRouter from './routes/users.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();


app.use(cors({

  origin: 'https://printipro.vercel.app/' ,
  credentials: true
}
));

app.use(express.json());



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});



// Routes
app.use('/api/auth', authRouter);
app.use('/api/materials', materialRouter);
app.use('/api/products', productRouter);
app.use('/api/clients', clientRouter);
app.use('/api/users', userRouter);
