import express from 'express';
import { config } from 'dotenv';
config();
import connectionToDB from './config/dbConnection.js';
import userRouter from './routes/user.route.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
const PORT = process.env.PORT;

app.use('/api', userRouter);

app.listen(PORT, async () => {
  await connectionToDB();
  console.log(`App is running ${PORT}`);
});
