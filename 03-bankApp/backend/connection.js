require('dotenv').config();
const mongoose = require('mongoose');

const mongoUri = process.env.mongoUri+"/bank";

function connectMongo(){
    mongoose.connect(mongoUri).then(() => {
    console.log("Mongo db connected successfully!!");
    });
}

module.exports={connectMongo};