const mongoose = require('mongoose')

require('dotenv').config();

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully connected to Gossimps Database in MongoDB`.green.underline.bold)
    }catch(err){
        console.log(`Error occured while connecting to the Database`.bgRed)
    }
}

module.exports = connectToDB;