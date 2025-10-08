const jwt = require('jsonwebtoken');

const {emailSchema, nameSchema, passwordSchema} = require('../validations/authSchema');


function validateSignUpInput(req,res,next){
    const {email,name,password} = req.body;
    if(emailSchema.safeParse(email).success && nameSchema.safeParse(name).success && passwordSchema.safeParse(password).success){
        next();
    }
    else{
        res.status(400).json({message:"Wrong Inputs"})
    }
}

function validateSignInInput(req,res,next){
    const { email, password } = req.body;
    if (
      emailSchema.safeParse(email).success &&
      passwordSchema.safeParse(password).success
    ) {
      next();
    } else {
      res.status(400).json({ message: "Wrong Inputs" });
    }
}


function verifyToken(req, res, next) {
    const token = req.cookies.authorization;
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.name=decoded.name;
        req.email=decoded.email;
        next();
    }catch{
        res.clearCookie("authorization");
        res.status(403).json({
            message:"Session Expired"
        });
    }
}


module.exports={validateSignUpInput, validateSignInInput, verifyToken}