const mongoose=require('mongoose');
const {ObjectId}= mongoose.Schema;


const userSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        index:true
    },
    picture:{
        type:String,
        default:''
    },
    role:{
        type:String,
        default:'subscriber'
    },
    cart:{
        type:Array,
        default:[]
    },
    address:{
        type:String,
        default:''
    },
    //wishlist:[{type:ObjectId, ref: "Product"}],
},{
    timestamps:true
});

module.exports=mongoose.model('User',userSchema);