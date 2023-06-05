const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
//whenever an error occurs the async handler pass it to error handler

const jwt = require("jsonwebtoken");

//@desc Register a new user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler( async (req,res)=>{
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const userExists = await User.findOne({ email }); //finding the user by email
    
    //If user already exists
    if(userExists){
        res.status(400);
        throw new Error("User already registered");
    }
    
    //Hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password,10); //10 -> Salt rounds
    //A salt is a random string. By hashing a plain text password plus a salt, the hash algorithm's output is no longer predictable
    console.log(hashedPassword)

    //inserting into the db
    const user = await User.create({ username, email, password:hashedPassword });
    console.log(user);
    res.status(201).json({message: "User created"})
    
});


//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    
    //compare password with hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        //provide a login access 
        const accessToken = jwt.sign(
            { 
                user:{
                    username: user.username,
                    email: user.email,
                    id:user.id
                 }
            },
            process.env.ACCESS_TOKEN_SECRET, 
            {expiresIn:"1m"} );
        res.status(200).json({accessToken });
    }
    else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }

   
});

//@desc Login user
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json({message:"Current user"});
});
module.exports = {registerUser , loginUser , currentUser}