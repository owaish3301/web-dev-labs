const { z } =  require('zod');

const emailSchema = z.email();

const nameSchema = z.string().min(1);

const passwordSchema = z.string().min(6);

module.exports={emailSchema,nameSchema,passwordSchema}