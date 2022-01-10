const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        let URL;
        process.env.NODE_ENV === 'dev'
        ? URL = process.env.MONGO_DEV
        : URL = process.env.MONGO_CNN
        const connection = await mongoose.connect( URL );
        console.log(`The database is running successfully in ${connection.connection.host}`)
    } catch (error) {
        throw new Error(`Error while initializing the database: ${error}`);
    }
}


module.exports = {
    dbConnection
}