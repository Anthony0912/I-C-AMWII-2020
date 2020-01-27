'use strict' // modo estricto para evitar sintaxis incorrec
var express = require('express');
var mongoose = require('mongoose')
var app = express();

mongoose.connect('mongodb://localhost:27017/Peliculas', { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    console.log("conexiónblecida a la base de datos " + db.name)
    db.close()
})

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get("/hello", (req, res, next) => {
    const message = req.query.message
    res.json({"Response": `Hello ${message}` });
});
  

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


