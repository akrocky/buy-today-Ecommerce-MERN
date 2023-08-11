const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:"Product title is required",
        maxlength:[32,"maxlength is 32"],
        text:true
    },
    slug:{
        type:String,
       unique:true,
        required:true,
        lowercase:true,
        index:true,
    },
    description:{
        type:String,
       
        required:"Product description is required",
        maxlength:[2000,"maxlength is 2000"],
        text:true
    },
    price:{
        type:Number,
        trim: true,
        required:"Product price is required",
        maxlength:[32,"maxlength is 32"],
       
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    subcategory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Subcategory"
        }
    ],
    quantity:Number,
    sold:{
        type:Number,
        default:0
    },
    images:{
        type: Array
    },
    shipping:{
        type:String,
        enum:["Yes", "No"]
    },
    color:{
        type:String,
        enum:["Black","Brown","Silver","White","Blue"]
    },
    brand:{
        type:String,
        enum:["Apple","Samsung","Microsoft","Lenevo","Asus"]
    },
    // ratings:[
    //     {
    //         star:Number,
    //         postedBY:{type:ObjectId, ref:"User"}
    //     }
    // ]
},{
    timestamps:true
})



module.exports= mongoose.model("Product",ProductSchema);
