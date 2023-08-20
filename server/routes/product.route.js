const express= require('express');
const axios= require('axios')
const router=express.Router();
// middlewares
const {authCheck,adminCheck}= require('../middlewares/auth.middleware')
//controllers
const  {createProduct, getProductsList,removeProduct,getProduct} =require('../controllers/product.controller')

router.post('/product',authCheck,adminCheck, createProduct);
router.get('/products/:count', getProductsList);

router.delete('/product/:slug',authCheck,adminCheck,removeProduct)
router.get('/product/:slug',getProduct)





  module.exports=router;






