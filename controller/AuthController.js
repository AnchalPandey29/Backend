const bcrypt = require("bcrypt"); //data encryption
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const register = async(req,res)=>{
    const {name,email,password} =req.body;
    console.log(req.body);
    

    if(!name || !email)
    {
        return res.status(400).json({message:"All fields are required"});
    }

    try{

        const already = await User.findOne({email});
        console.log("already user",already);
        

        if(already)
        {
            return res.status(400).json({message:"Email aready exist , please do login"});
        }
        
        const hashpwd = await bcrypt.hash(password,8);
        console.log("Hashed password:",hashpwd);
        
        
        const  userData= await User.create({name,email,password:hashpwd});

        console.log(userData);
        
        res.status(201).json({message:"Account created successfully"})

    }
    catch(err)
    {
        console.error("Error happened",err.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const login =async(req,res)=>{
    const {email,password} =req.body;

    if(!email || !password)
    {
        return res.status(400).json({message:"All fields required"});

    }

   try{
 
    const user= await User.findOne({email});
    if(!user) return res.status(404).json({message:"User not found"});

    const validpwd = await bcrypt.compare(password,user.password);
    if(!validpwd) return res.status(400).json({message:"Invalid password"});



    const token = jwt.sign({id:user._id, email:user.email},
        process.env.JWT_KEY,
        {
            expiresIn:"1h"
        }
    );

        res.status(200).json({message:"Login successful",token})



   }
   catch(err)
   {
        res.status(500).json({message:"Internal Server error"})

   }
}


module.exports={register,login};