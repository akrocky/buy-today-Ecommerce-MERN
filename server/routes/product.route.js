const express= require('express');
const axios= require('axios')
const router=express.Router();
// middlewares
const {authCheck,adminCheck}= require('../middlewares/auth.middleware')
//controllers
const  {createProduct, getProductsList} =require('../controllers/product.controller')

router.post('/product',authCheck,adminCheck, createProduct);
router.get('/products', getProductsList);






  module.exports=router;






