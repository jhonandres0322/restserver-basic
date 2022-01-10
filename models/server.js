const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        // Paths Route
        this.usersPath = '/api/users';
        //Connection Database
        this.connectDatabase();
        // Middlewares
        this.middlewares();
        // App Routes
        this.routes();
    }


    async connectDatabase(){
        await dbConnection();
    }

    middlewares () {
        // Middlewares CORS 
        this.app.use(cors());
        // Public Folder
        this.app.use( express.static('public') );
        // Parse body - Format JSON
        this.app.use( express.json());
    }

    routes () {
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen () {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

}

module.exports = Server;