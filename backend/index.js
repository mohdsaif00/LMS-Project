import express from 'express';
import userRouter from './routes/user.route.js';
import cors from 'cors';
import dotenv from 'dotenv';
import connectionToDB from './config/dbConnection.js';
dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('This is home page');
});

app.use('/api', userRouter);

app.listen(PORT, async () => {
  await connectionToDB();
  console.log(`server running on http://localhost:${PORT}`);
});
