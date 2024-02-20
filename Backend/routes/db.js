const mongoose = require('mongoose');

// connect to database
const mongoURI = 'mongodb://localhost:27017/Notebook';
const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB', error);
        });
}
module.exports = connectToMongo;