import express from 'express';
<<<<<<< HEAD
import userRouter from './routes/user.route.js';
import cors from 'cors';
import dotenv from 'dotenv';
import connectionToDB from './config/dbConnection.js';
dotenv.config({ path: './.env' });
=======
import { config } from 'dotenv';
config();
import connectionToDB from './config/dbConnection.js';
import userRouter from './routes/user.route.js';
import cors from 'cors';
>>>>>>> 424e8922a63aca601bde57a113f26f52f37c5330

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
<<<<<<< HEAD

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('This is home page');
});
=======

const PORT = process.env.PORT;
>>>>>>> 424e8922a63aca601bde57a113f26f52f37c5330

app.use('/api', userRouter);

app.listen(PORT, async () => {
  await connectionToDB();
<<<<<<< HEAD
  console.log(`server running on http://localhost:${PORT}`);
=======
  console.log(`App is running ${PORT}`);
>>>>>>> 424e8922a63aca601bde57a113f26f52f37c5330
});
