
// Importaciones de terceros
require('dotenv').config();

// Importaciones Propias
const Server = require('./models/server');
const server = new Server();
server.listen();


