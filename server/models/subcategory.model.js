const mongoose= require('mongoose');

const subcategorySchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:"Name is required",
        minlenght:[2,"Too Short"],
        maxlength:[32,"Too long"]
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },

},{
    timestamps:true
});

module.exports= mongoose.model("Subcategory",subcategorySchema);
