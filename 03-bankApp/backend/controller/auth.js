const {User} = require('./../models/auth')
const jwt = require('jsonwebtoken')

async function signup(req,res){
    const { email, name, password } = req.body;
    const user = new User({name,email,password});
    try{
        const mongoResponse = await user.save();
        const token = jwt.sign({email,name},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.cookie("authorization",token,{
            httpOnly:true,
            secure:true,
            maxAge:60*60*1000
        })
        res.status(201).json({message: 'User created', userId: mongoResponse._id});
    }catch(err){
        res.status(500).json({message: 'Failed to create user', error: err.message});
    }
}

async function Signin(req,res){
    const { email, password } = req.body;
    const mongoResponse = await User.findOne({email})

    if(!mongoResponse){
        res.clearCookie();
        res.status(400).json({
            message:"User not found"
        })
    }
    
    if(mongoResponse.password===password){
        const payload = {email, name:mongoResponse.name};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.cookie("authorization",token,{
            httpOnly:true,
            secure:true,
            maxAge:60*60*1000
        });
        res.status(200).json({
            message:"Signin Successful"
        })
    }
    else{
        res.clearCookie();
        res.status(400).json({
            message:"Password error"
        })
    }
}

function verifyAuthentication(req,res){
    res.status(200).json({
        message:"Session verified",
        name:req.name
    });
}

function signOut(req,res){
    res.clearCookie('authorization');
    res.status(200).json({
        message:"Logout Successful"
    });
}

module.exports={signup, Signin, verifyAuthentication, signOut}