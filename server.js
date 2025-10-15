const  express = require("express");
const app = express();
//env configuration
const dotenv= require("dotenv");
dotenv.config();
const connectDB = require("./data/db");
connectDB();
const cors =require("cors");
app.use(cors());


const userRoute = require("./router/userRoutes");
const AuthRoute = require("./router/AuthRoute");

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Home page")
})

//router
app.use("/user",userRoute);
app.use("/auth",AuthRoute);

const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
    
})


