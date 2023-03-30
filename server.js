const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const Authn = require("./control/authen");
const { connect } = require("moongose/routes");
const { User } = require("./model/user");
const db = require("./config/db.js");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// const mongoURI = "mongodb://localhost:27016/sessions";
// const store = new MongoStore();

db.connect();

app.use(session({
  secret: 'fsdfds121sdfs1d5sdffsdfs156a',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 },
  store: MongoStore.create({
  mongoUrl: `mongodb://Mongo:Mongo1234@localhost:27016/?authMechanism=DEFAULT`,
  dbName: "Moonlight-DB" 
}),
}));

app.get('/', (req,res) => {
  console.log(req.session);
  req.session.text = 'Hello'
  res.render("home.ejs");
}); 

// app.post('/sign up', async(req, rwes) => {
//   const { newEmail, newPassword } = req.body;
// })

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // const oldUser = await User.findOne({ email: email, password: password });
  // if (oldUser) {
  //   req.session.userId = oldUser.id;
  //   console.log(req.session);
  // } else {
    const newUser = new User({ email: email, password: password});
    newUser.save();
  //   req.session.userId = newUser.id;
  //   console.log(req.session);
  // }
  res.redirect("/");
});

// app.get('/signup', async(req, res) => {
//   const {email, password} = req.body;
//   const valPassword = req.body.newPasswordVal;
//   const oldUser = await User.findOne({ email: email, password: password });

//   if(password == valPassword) {
//     const newUser = new User({ email: newEmail, password: newPassword });
//     newUser.save();
//     req.session.userId = newUser.id;
//   }else {
//     console.log('Wrong');
//   }
//   res.redirect('/')
//   console.log(req.session);
// })

// app.post("/logout", (req, res) => {
//   req.session.destroy(function (err) {
//     res.redirect("/");
//   });
// });

app.listen("3000", () => {
  console.log("Server is running on Port 3000.");
});
