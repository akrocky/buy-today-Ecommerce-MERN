const express = require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyParser = require('body-parser')
const cors=require('cors')

const {readdirSync}=require('fs');
require('dotenv').config()
const connectToMongo = require('./db');
// import routes
const authRoutes= require('./routes/auth.route')
//app
const app = express()

connectToMongo();
// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit:"2mb"}));
app.use(cors());

// routes middleware
readdirSync('./routes').map((r)=>app.use("/api",require(`./routes/${r}`)))

app.listen(process.env.PORT || 8000, () => {
  console.log(`buy-toay-ecommerce server listening on port ${process.env.PORT}`)
})