const User= require('../models/user.model')
exports.createOrUpdateUser=async (req, res) => {
    
   const {picture,email}=req.user;
    console.log(req.user);
    
   const user =await User.findOneAndUpdate(
    {email},
    {name:email.split('@')[0],picture},
    {new:true})
   if (user) {
    res.json(user)
   }else{
    console.log("user pay nai");
    const newUser= await new User({
        email,
        name:user.email.split('@')[0],
        picture
    }).save();
    res.json(newUser)
   }
  }
exports.currentUser=async (req, res) => {
   User.findOne({email:req.user.email}).exec((err,user)=>{
    if (err) {
        console.log(err.message);
        res.json({})
    }
    res.json(user);
   })
  }




