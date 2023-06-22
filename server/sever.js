const express = require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyParser = require('body-parser')
const cors=require('cors')
const { babelParse } = require('@vue/compiler-sfc')
require('dotenv').config()

//app
const app = express()
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true
})
.then(()=> console.log("DB connected"))
.catch(err=> console.log(`DB connection error ${err.message}`));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit:"2mb"}));
app.use(cors());

// route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 8000, () => {
  console.log(`buy-toay-ecommerce server listening on port ${process.env.PORT}`)
})