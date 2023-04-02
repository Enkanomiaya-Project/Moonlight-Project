const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const Authn = require("./controller/authen");
const { User } = require("./model/user");
const db = require("./config/db.js");
const bodyParser = require("body-parser");
const { log } = require("console");
const { Item, FoodDelivery } = require("./model/res");
const { List } = require("./model/res");
// const { FoodDelivery } = require('./model/res');

const app = express();
const orderList = []; 

app.use(express.json()) 
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
  mongoUrl: `mongodb://Mongo:Mongo1234@172.17.0.1:27016/?authMechanism=DEFAULT`,
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
app.get('/cart', async(req, res) => {
  const items = await Item.find({});
  const sum = items.reduce((a,b)=> a+new Number(b.price), 0);
  console.log(sum);
  res.render("cart.ejs", { newListItems: items , total: sum});
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
app.get('/admin-cooking', async(req, res) => {
  const resFood = await FoodDelivery.find({});
  res.render('admin-cooking.ejs', { newListItems: resFood })
})
app.get('/admin-delivering', (req, res) => {
  res.render('admin-delivering.ejs')
})
app.get('/admin-successed', (req, res) => {
  res.render('admin-successed.ejs')
})
app.get('/logout', (req, res) => {
  res.render('home.ejs');
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
      console.log("The password doesn't match");
  }

  res.redirect('/')
  console.log(req.session);
})

app.post("/logout", (req, res) => {
  req.session.destroy(function (err) {
    console.log(req.session.userId);
    res.redirect("/");
  });
}); 

app.post('/addToCart' , async(req,res) => {
  const items = await Item.find({});
  const {menu , price} = req.body

  Item.insertMany({menu: menu, price})
    .then(() => console.log("Add data successed"))
    .catch((err) => console.log(err));

  console,log(items);
  // console.log(req.body); 
  // res.json({ message: 'OK' });  
});

app.post('/cart', async(req, res) => {
  const items = await Item.find({});
  const newItems = new Item({menu: items, price: items});
  const result = result + items.price;
  newItems.save();
  const updateList = await List.updateOne(
      { menu: menu, price: price},
      { $push: { items: newItems} }
    );
    console.log("Success");
})

app.post('/admin-cooking', async(req, res) => {
  const resFood = await FoodDelivery.find({});
  const newItems = new FoodDelivery({id: resFood, first_name: resFood, date: resFood, totalAmount: resFood, status:resFood});
  newItems.save();
  const updateList = await FoodDelivery.updateOne(
    {id: resFood, first_name: resFood, date: resFood, totalAmount: resFood, status:resFood}, 
      { $push: { resFood: newItems} }
    );
    console.log("Success");
})

app.post("/delete", async (req, res) => {
  const listName = req.body.listName;
  const deleteItemId = req.body.button;
  console.log(deleteItemId);
  const result = await Item.findByIdAndRemove(deleteItemId);
  res.redirect('/cart'); 
}); 

// app.post("/delete", async (req, res) => {
//   const listName = req.body.listName;
//   const deleteItemId = req.body.checkbox;
  
//   if (listName == "Today") {
//     const result = await Item.findByIdAndRemove(deleteItemId);
//     res.redirect("/");
//   } else { 
//     const updateList = await List.updateOne(
//       { name: listName },
//       { $pull: { items: { _id: deleteItemId } }}
//       );      
//     res.redirect("/" + listName); 
//   }
// });

app.listen("3000", () => {
  console.log("Server is running on Port 3000.");
});
