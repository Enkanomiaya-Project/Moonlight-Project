const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const Authn = require("./control/authen");
const { connect } = require("moongose/routes");
const { User } = require("./model/user");
const db = require("./config/db.js");
const bodyParser = require("body-parser");
const { log } = require("console");
const { res } = require('./model/res');

const app = express();

app.use('/public' ,express.static("public"));
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
  console.log(req.session.userId);
  res.render("home.ejs");
}); 

app.get('/signup', (req, res) => {
  res.render('signup.ejs')
})
app.get('/main', (req, res) => {
  res.render('main.ejs')
})
app.get('/cart', (req, res) => {
  res.render('cart.ejs')
})
app.get('/profile', (req, res) => {
  res.render('profile.ejs')
})
app.get('/login', (req, res) => {
  res.render('login.ejs')
})
app.get('/dessert', (req, res) => {
  res.render('dessert.ejs')
})
app.get('/appetizer', (req, res) => {
  res.render('appetizer.ejs')
})
app.get('/drink', (req, res) => {
  res.render('drink.ejs')
})
app.get('/main', (req, res) => {
  res.render('main.ejs')
})
app.get('/history', (req, res) => {
  res.render('history.ejs')
})
app.get('/ordering_status', (req, res) => {
  res.render('ordering_status.ejs')
})
app.get('/admin-queueing', (req, res) => {
  res.render('admin-queueing.ejs')
})

app.get('/admin', (req, res) => {
  res.render('admin.ejs')
})


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const userLog = await User.findOne({ email: email , password: password});
  console.log(userLog.email);
  if (userLog != null) {
    if(password == userLog.password) {
      req.session.userId = userLog.id;
      // console.log(req.session , );
      
      if(userLog.role == 'User'){
        res.redirect('/');
      } else {
        res.redirect('/admin-queueing');  
      }
    } else {
      console.log('Wrong Password');
    }
  } else {
    console.log('wrong');
  }
  
});

app.post('/signup', async(req, res) => {
  const {newEmail, newPassword, newPasswordVal} = req.body;
  const roleDefault = 'User';
  // const oldUser = await User.findOne({ email: email, password: password });

    if(newPassword == newPasswordVal) {
      const newUser = new User({ email: newEmail, password: newPassword, role: roleDefault});
      newUser.save();
      req.session.userId = newUser.id;
    }else {
      alert("The password doesn't match");
  }

  res.redirect('/')
  console.log(req.session);
})

app.post("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

app.listen("3000", () => {
  console.log("Server is running on Port 3000.");
});
