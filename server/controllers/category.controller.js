const Category= require('../models/Category.model');
const Subcategory= require('../models/subcategory.model');
const  slugify = require('slugify')

exports.createCategory =async(req,res)=>{
 
   
    
    try {
        const {name}=req.body;
        const category= await new Category({name,slug:slugify(name)}).save();
        res.json(category)
    } catch (error) {
        console.log(error.message);
        res.status(400).send('create category failed')
    }
}
exports.categorylist =async(req,res)=>{
    try {
        res.json( await Category.find({}).sort( {createdAt: -1}))
    } catch (error) {
        res.status(400).send('something went wrong')
    }

}
exports.getCategory =async(req,res)=>{
 
try {
    let category = await Category.findOne({slug : req.params.slug}); 
    res.json(category)  
} catch (error) {
    res.status(400).send('something went wrong')
}
}
exports.updateCategory =async(req,res)=>{
    console.log(req.params.slug);
    console.log(req.body);
    const {name}=req.body;
 
try {
    const updated= await Category.findOneAndUpdate({slug: req.params.slug},{name: name, slug: slugify(name)},{new: true})
    res.json(updated)
} catch (error) {
    res.status(400).send('cataegory update failed')
}
}
exports.removeCategory =async(req,res)=>{

    try {
        const deleted = await Category.findOneAndDelete({slug: req.params.slug})
        res.json({
            message:`${req.params.slug} category is deleted`
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).send(' category delete failed')
    }

};


exports.getSubcategorywithId = async (req,res)=>{
    
console.log(req.params._id);
    try {
        const response = await Subcategory.find({parent : req.params._id});
        res.json(response)
    } catch (error) {
        
        res.status(400).send(error.message)
    }

    
}
