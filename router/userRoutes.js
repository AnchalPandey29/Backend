const express = require("express");
const router = express.Router();

const {getAllUser, addUser} =require("../controller/userController")

router.get("/",getAllUser);
router.post("/",addUser);

module.exports=router;
