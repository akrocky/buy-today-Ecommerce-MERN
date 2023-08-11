const Subcategory= require('../models/subcategory.model');
const  slugify = require('slugify')

exports.createSubcategory =async(req,res)=>{
 
   
    
    try {
        const {name,parent}=req.body;
        const subcategory= await new Subcategory({name,slug:slugify(name),parent}).save();
        res.json(subcategory)
    } catch (error) {
        console.log(error.message);
        res.status(400).send('create subcategory failed')
    }
}
exports.subcategorylist =async(req,res)=>{
    try {
        res.json( await Subcategory.find({}).sort( {createdAt: -1}))
    } catch (error) {
        res.status(400).send('something went wrong')
    }

}
exports.getSubcategory =async(req,res)=>{
 
try {
    let subcategory = await Subcategory.findOne({slug : req.params.slug}); 
    res.json(subcategory)  
} catch (error) {
    res.status(400).send('something went wrong')
}
}
exports.updateSubcategory =async(req,res)=>{
    console.log(req.params.slug);
    console.log(req.body);
    const {name,parent}=req.body;
 
try {
    const updated= await Subcategory.findOneAndUpdate({slug: req.params.slug},{name: name, slug: slugify(name),parent:parent},{new: true})
    res.json(updated)
} catch (error) {
    res.status(400).send('subcategory update failed')
}
}
exports.removeSubcategory=async(req,res)=>{

    try {
        const deleted = await Subcategory.findOneAndDelete({slug: req.params.slug})
        res.json({
            message:`${req.params.slug} subcategory is deleted`
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).send(' subcategory delete failed')
    }

}
