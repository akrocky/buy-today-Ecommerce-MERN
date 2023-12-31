const express= require('express');
const router=express.Router();
// middlewares
const {authCheck,adminCheck}= require('../middlewares/auth.middleware')
//controllers
const  {createCategory, getCategory, updateCategory,removeCategory,categorylist,getSubcategorywithId} =require('../controllers/category.controller')

router.post('/category',authCheck,adminCheck, createCategory);
router.get('/categories', categorylist);
router.get('/category/:slug', getCategory);
router.put('/category/:slug',authCheck,adminCheck, updateCategory);
router.delete('/category/:slug',authCheck,adminCheck, removeCategory);
router.get('/category/subcategory/:_id', getSubcategorywithId)




  module.exports=router;






