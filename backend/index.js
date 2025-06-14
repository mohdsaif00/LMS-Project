import express from 'express'

import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

const app = express()


app.get('/', (req, res) => {
      res.send("This is home page")
})

const PORT = process.env.PORT

app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
})
