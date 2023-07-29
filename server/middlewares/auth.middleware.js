const admin=require("../firebase/index");
const User = require("../models/user.model")

exports.authCheck=async(req,res,next)=>{
// console.log(req.headers);
console.log("in auth check");
try {
    const firebaseUser=await admin.auth().verifyIdToken(req.headers.authtoken)
         req.user=firebaseUser;
         next()
} catch (error) {
    console.log("validation e pb");
     console.log(error.message);
    res.status(401).json({
        error:"invalid or expired token"
    })
}




};


exports.adminCheck = async (req, res, next) =>{
    console.log("in admin check");
 const {email} = req.user;
 const adminUser = await User.findOne({email});

 if (adminUser.role !== 'admin') {
    res.status(403).json({
        err: "Admin resource. Access denied."
    })
 }else{
    next();
 }
}