import express from 'express';

import userRouter from './routes/user.route.js';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());
<<<<<<< HEAD
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
=======

app.get('/', (req, res) => {
  res.send('This is home page');
});

app.use('/user', userRouter);

>>>>>>> main
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
