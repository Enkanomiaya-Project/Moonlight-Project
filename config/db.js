const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27016/', {
        auth: {
            username: "Mongo",
            password: "Mongo1234"
        },
        dbName: "restuarant"
    }).then( () => console.log("Database is connected"))
    .catch( e => console.error(e)) 
}