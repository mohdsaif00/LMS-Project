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
