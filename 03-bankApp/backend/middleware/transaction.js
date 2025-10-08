const {amountSchema, recieverMailSchema} = require("../validations/transactionSchema");

function validateTransaction(req,res,next){
    try{
        amountSchema.safeParse(req.body.amount);
        recieverMailSchema.safeParse(req.body.recieverMail);
        next()
    }
    catch{
        res.status(400).json({
            message:"Bad Inputs"
        })
    }
}

module.exports={validateTransaction}