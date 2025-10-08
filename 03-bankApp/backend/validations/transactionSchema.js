const {z} = require('zod');

const amountSchema = z.number();

const recieverMailSchema = z.email();

module.exports={amountSchema,recieverMailSchema};