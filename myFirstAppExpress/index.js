var express = require('express');
var app = express();

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


