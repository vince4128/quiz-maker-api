const   express         = require("express"),
        app             = express(),
        serverConfig    = require("./server/server.config"),
        serverConnect   = require("./server/server.connect"),
        routes          = require("./routes");

serverConfig.config(app);
serverConnect.connect();

app.use("/category", routes.categoryRoute);
app.use("/user", routes.userRoute);
app.use("/image", routes.imageRoute);
app.use("/upload", routes.uploadRoute);
app.use("/auth", routes.authRoute);
app.use("/", routes.quizRoute);