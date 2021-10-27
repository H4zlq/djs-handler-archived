const mongoose = require('mongoose');
require('dotenv').config();

if (!process.env.MONGODB_URI) throw Error('Please put your mongoose string in the .env file!');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log('Connected to Mongo Database ✅');
}).catch((err) => {
    console.log(err);
})

module.exports = mongoose;