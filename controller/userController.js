let users =[];

//function to get all users
const getAllUser = (req,res)=>{
    res.json(users);
};

//function to add users
const addUser = (req, res)=>{
    const {name, email} = req.body;

    if(!name||!email) return res.status(400).send("Name and email are required");

    const newuser = {
        id:users.length+1,
        name,
        email,
    }

    users.push(newuser);
    res.status(200).send({message:"User added successfuly",newuser})
}

module.exports ={getAllUser, addUser};
