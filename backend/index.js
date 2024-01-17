const express = require('express');
const app = express();
const MongoDB = require('./db');
const cors = require('cors');

const port = 5050;

app.use(cors({
    origin: ["https://foody-beta-blond.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
}));

MongoDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use(express.json());
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use("/api", require("./Routes/OrderData"));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})