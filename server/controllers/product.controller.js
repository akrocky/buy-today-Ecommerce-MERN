const Product = require('../models/product.model');

const slugify=require('slugify');
exports.createProduct=async(req,res)=>{
try {
    // console.log(req.body);
    req.body.slug= slugify(req.body.title);
    const newProduct= await new Product(req.body).save();
    res.json(newProduct);

} catch (error) {
    console.log(error);
  //  res.status(400).send("Create product failed")
  res.status(400).json({
    err:error.message
  })
}
}

exports.getProductsList=async(req, res)=>{

  const products= await Product.find({})
  .limit(parseInt(req.params.count))
  .populate("category")
  .populate("subcategory")
  .sort([['createdAt',"desc"]]);

  res.json(products)
}
exports.removeProduct=async(req, res)=>{
  try {
    const deleted= await Product.findOneAndRemove({slug: req.params.slug});
    res.json(deleted)
    
  } catch (error) {
    console.log(error);
    return res.status(400).send('product delete failed')
  }


}