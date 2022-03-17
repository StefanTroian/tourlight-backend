"use strict"

//globals
global.SERVICE_NAME = `tourlight`;
global.BASE_PATH = `/api/${global.SERVICE_NAME}`;

const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const CONSTANTS = require("./config/constants");
const port = CONSTANTS.PORT;
const dbService = require("./mongo/database.service");

const databaseRouter = require("./routers/database.router")

const app = express();
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const allowedOrigins = ['https://tourlight.herokuapp.com', undefined];
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true) 
      } else {
        callback(new Error(`Origin: ${origin} is now allowed`))
      }
    }
}));

const server = http.createServer(app);

function setup() {
    console.log("============================");
    console.log("== Starting Tourlight...  ==");
    console.log("============================");

    //routes
    app.use(global.BASE_PATH + "/database", databaseRouter);

    app.use(function (req, res, next) {
        let error = new Error('Not Found');
        error.status = 404;
        next(error);
    })

}

async function init() {
    setup()

    server.listen(port, async function() {
        console.log(`Server is listening on port: ${port}`);
    })
}

init();

exports.server = server;
exports.init = init;