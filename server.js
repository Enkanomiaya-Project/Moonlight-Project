const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MonoStore = require("connect-mongo");
const MongoDBSession = require("connect-mongodb");
const Authn = require("./control/authen");
const { connect } = require("moongose/routes");
const user = require;
const app = express();

app.set("view engine", "ejs");
const mongoURI = "mongodb://localhost:27016/sessions";

db.connect();

const store = new MongoDBSession({
  uri: mongoURI,
  collection: "mySesions",
});

app.use(
  session({
    secret: "jklfsodifjsktnwjasdp465dd",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }, //one hour
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/todolistDB",
    }),
  })
);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email: email, password: password });
  if (oldUser) {
    req.session.userId = oldUser.id;
    console.log(req.session);
  } else {
    const newUser = new User({ email: email, password: password });
    newUser.save();
    req.session.userId = newUser.id;
    console.log(req.session);
  }
  res.redirect("/");
});

app.post("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

app.listen("3000", () => {
  console.log("Server is running on Port 3000.");
});
