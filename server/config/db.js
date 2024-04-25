const mongoose = require('mongoose')

require('dotenv').config();

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully connected to Gossimps Database in MongoDB`.bgGreen)
    }catch(err){
        console.log("Error connecting to the Database")
    }
}

module.exports = connectToDB;