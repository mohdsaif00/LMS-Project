
import express from 'express';
import { config } from 'dotenv';
config();
import connectionToDB from './config/dbConnection.js';
import userRouter from './routes/user.route.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use('/api', userRouter);

app.listen(PORT, async () => {
  await connectionToDB();
  console.log(`App is running ${PORT}`);
});

import express from 'express'

import userRouter from "./routes/user.route.js"

import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
      res.send("This is home page")
})

app.use("/user", userRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
})

