import express from "express"

const app = express();
app.use(express.json());

app.get('/app', (request, response) => {
    response.send('This is my profile')
})

export default app;