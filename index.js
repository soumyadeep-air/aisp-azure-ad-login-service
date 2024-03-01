const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authRouter = require("./auth/routes");
require("dotenv").config();

const app = express();
app.use(
  session({
    name: "cid.session",
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // secure: false // set this to true on production when using with https
    },
    // store: MongoStore.create({
    //   mongoUrl: 'mongodb://mongoadmin:bdung@127.0.0.1:27018',
    //   dbName: 'express-cookie',
    //   collectionName: 'sessions'
    // })
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  if (req.session.isAuthenticated) return res.send(req.session.account);
  return res.send("ok");
});
app.use("/auth", authRouter);

app.listen(3001, (req, res) => {
  console.log("server started");
});
