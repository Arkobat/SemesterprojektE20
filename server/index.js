/* eslint-disable no-undef */
const app = require('express')();
const server = require('http').Server(app);
require("./middleware/socket.js")(server)

const cors = require("cors");
const corsOptions = {
    origin: ["http://stream.stud-srv.sdu.dk/", /\.*\.stream\.stud-srv\.sdu\.dk\/?$/],
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));
app.use(require('./endpoints/index.js'))

server.listen(8080);

module.exports = app