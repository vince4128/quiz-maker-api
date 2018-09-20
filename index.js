const   express         = require("express"),
        app             = express(),
        mongoose        = require("mongoose"),
        multer          = require("multer"),
        serverConfig    = require("./server/server.config"),
        serverConnect   = require("./server/server.connect")

serverConfig.config(app);
serverConnect.connect();