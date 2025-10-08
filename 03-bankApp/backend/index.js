const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors');

const { connectMongo } = require('./connection.js')
const { authRouter } = require('./routes/auth.js');
const { tranasactionRouter } = require('./routes/transactions.js');
require('dotenv').config()

const PORT = process.env.PORT||3001

const app = express();
app.use(express.json())
app.use(cookieparser())
app.use(cors(
    {origin: "http://localhost:5173",credentials: true}
))

app.use('/api/auth', authRouter)
app.use('/api/transactions', tranasactionRouter)

app.listen(PORT,()=>{
    console.log("Server started at :"+PORT);
    connectMongo();
})
