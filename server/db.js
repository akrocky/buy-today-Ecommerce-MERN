const mongoose = require('mongoose');
const mongoURI = process.env.DATABASE

const connectToMongo = async () => {
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI) 
    console.log('Mongodb connected')
    
}
catch(error) {
    console.log(    `DB connection error ${error.message}`);


}
}
module.exports = connectToMongo;