const express= require('express');
const router=express.Router();
// middlewares
const {authCheck,adminCheck}= require('../middlewares/auth.middleware')
//controllers
const  {createSubcategory, getSubcategory, updateSubcategory,removeSubcategory,subcategorylist} =require('../controllers/subcategory.controller')

router.post('/subcategory',authCheck,adminCheck, createSubcategory);
router.get('/subcategories', subcategorylist);
router.get('/subcategory/:slug', getSubcategory);
router.put('/subcategory/:slug',authCheck,adminCheck, updateSubcategory);
router.delete('/subcategory/:slug',authCheck,adminCheck, removeSubcategory);





  module.exports=router;






