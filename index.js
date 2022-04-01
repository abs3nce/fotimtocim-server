//import package
const express = require("express");
const morgan = require("morgan");
const session = require("./middlewares/middleware_session");
require("dotenv").config();

//init express
const app = express();
app.use(express.json());

//nastavenie proxy
app.set("trust proxy", 1); //ak budem pouzivat nginx proxy tak toto treba zapnut (nginx for sure)

//middlewares
app.use(morgan("dev"));
app.use(session);

//import a use custom routes
const profileRoute = require("./routes/route_profile");
const loginRoute = require("./routes/route_login");

app.use("/api", profileRoute);
app.use("/api", loginRoute);

//server listen
app.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}`)
);
