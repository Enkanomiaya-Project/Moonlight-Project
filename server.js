const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MonoStore = require('connect-mongo');
const MongoDBSession = require('connect-mongodb');
const Authn = require('./control/authen');
const { connect } = require('moongose/routes');
const user = require
const app = express();

app.set("view engine", "ejs");
const mongoURI = "mongodb://localhost:27016/sessions"

db.connect();

const store = new MongoDBSession({
   uri: mongoURI,
   collection: 'mySesions'
})

app.use(
   session({
      secret: "jklfsodifjsktnwjasdp465dd", 
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 3600000 }, //one hour
      store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/todolistDB"}),
   })
);
   

app.get('/', (req,res) =>{
   req.session.isAuth = true;
   console.log(req.session);
   console.log(req.session.id);
   res.render('admin-cooking'); 
});

app.listen("3000", () => {
    console.log("Server is running on Port 3000.");
  });