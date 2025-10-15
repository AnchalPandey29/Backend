const express=require("express");
const  router=express.Router();

const {register,login} = require("../controller/AuthController");
const verifyToken = require("../middleware/AuthMiddleware");

router.post("/register",register);
router.post("/login",login);

// protected routes 
router.get("/profile",verifyToken,(req,res)=>{
    res.json({
        message:"Access granted to user",
        user:req.user
    })
})

module.exports = router;
