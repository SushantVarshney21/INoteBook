const mongoose = require('mongoose');

require('dotenv').config()


const connectToMongo = ()=>{
    mongoose.connect(process.env.REACT_APP_MONGO_URL)
    .then(success => console.log('Sushant Connect To Mongo Successfully'))
}


module.exports = connectToMongo;