import express from "express"
import { config } from "dotenv"
config()
import connectionToDB from "./config/dbConnection.js"

const app = express();
app.use(express.json());

const PORT = process.env.PORT

app.listen(PORT, async() => {
    await connectionToDB();
    console.log(`App is running ${PORT}`);
    
})