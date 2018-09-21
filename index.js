const   express         = require("express"),
        app             = express(),
        mongoose        = require("mongoose"),
        multer          = require("multer"),
        serverConfig    = require("./server/server.config"),
        serverConnect   = require("./server/server.connect"),
        routes          = require("./routes");

serverConfig.config(app);
serverConnect.connect();

app.use("/category", routes.categoryRoute);
app.use("/user", routes.userRoute);
app.use("/", routes.quizRoute);