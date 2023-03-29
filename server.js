const express = require('express');

const app = express();

app.get('/', (req,res) =>{
   res.render('admin-queueing'); 
});

app.listen("3000", () => {
    console.log("Server is running on Port 3000.");
  });