const bcrypt = require("bcrypt"); //data encryption
const User = require("../model/userSchema");

const register = async(req,res)=>{
    const {name,email,password} =req.body;

    if(!name || !email || !password)
    {
        return res.status(400).json({message:"All fields are required"});
    }

    try{

        const already = await User.findOne({email});

        if(already)
        {
            return res.status(400).json({message:"Email aready exist , please do login"});
        }
        
        const hashpwd = bcrypt.hash(password,8);
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

module.exports={register};