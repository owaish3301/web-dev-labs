const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const cors =  require('cors');
const cookieParser = require('cookie-parser');
const { MongoClient } = require('mongodb');

const app = express();

const jwtPass = "shadow@123"
const mongoUri = "mongodb://localhost:27017"

const client = new MongoClient(mongoUri);
const db = client.db("Auth_test");
const users = db.collection('Users');
console.log("Mongodb connected...")

const emailSchema = zod.email();
const passSchema = zod.string().min(6);

// Allow requests from frontend and allow cookies to be included
app.use(cors({
    origin: 'http://localhost:5173', // adjust if your frontend uses a different port or origin
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

function checkAuthInputs(req,res,next){
    const emailResponse = emailSchema.safeParse(req.body.email);
    const passResponse = passSchema.safeParse(req.body.pass);

    if(!emailResponse.success && !passResponse.success){
        return res.status(411).json({
            "message":"wrong inputs"
        })
    }
    next();
}

function verifyToken(req,res,next){
    const token = req.cookies.authorization;
    if(!token) return res.status(403).json({"message":"Auth error"})
    try{
        const decoded = jwt.verify(token,jwtPass);
        req.name = decoded.name;
        next();
    }catch{
        res.status(403).json({"message":"Auth error"})
    }
}

app.post('/signup', checkAuthInputs, async (req,res)=>{
    const user = {
        "name":req.body.name,
        "email":req.body.email,
    }

    const token = jwt.sign(user,jwtPass, {expiresIn:'1h'})
    const checkEmailResponse = await users.findOne({"email":user.email})
    if(checkEmailResponse){
        return res.status(403).json({
            message:"Email already exists"
        })
    }
    const mongoResponse = await users.insertOne({...user,pass:req.body.pass});
    if(mongoResponse.acknowledged){
        res.cookie("authorization",token,{
            httpOnly:true,
            secure:false,
            maxAge:60*60*1000
        });

        res.json({
            message:"signup successful"
        })
    } else{
        res.status(500).json({
            message:"Some unknown error occured"
        })
    }
})

app.get('/verify', verifyToken,(req,res)=>{
    res.json({
        message:"verified user",
        "name":req.name
    })
})


app.get('/signout', verifyToken,(req,res)=>{
    res.clearCookie('authorization');
    res.json({
        "message" : "signout successful"
    })
})

app.post('/signin', async (req,res)=>{
    const {email, pass} = req.body;
    const mongoResponse = await users.findOne({"email":email})
    if(mongoResponse){
        if(mongoResponse.pass===pass){
            const payload = {"email":mongoResponse.email,"name":mongoResponse.name}
            const token = jwt.sign(payload,jwtPass, {expiresIn:'1h'})
            res.cookie("authorization",token,{
                httpOnly:true,
                secure:false,
                maxAge:60*60*1000
            });
            res.status(200).json({
                "message":"signin successful"
            })
        }
        else{
            res.status(403).json({
                message:"wrong pass"
            })
        }
    }else{
        res.status(500).json({
            message:"Email not found"
        })
    }
})

app.listen(3000,()=>{
    console.log("server running...")
});