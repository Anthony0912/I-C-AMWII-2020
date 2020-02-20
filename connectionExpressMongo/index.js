const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {  
    res.json({"message": "Hello World"});
});

const userRoutes = require('./src/routes/user.routes')
app.use('/api/users', userRoutes)

app.listen(port, () => {  
    console.log(`Node server is listening on port ${port}`);
});

const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {  
    console.log("Successfully connected to the database");
}).catch(err => {  
    console.log('Could not connect to the database.', err);  
    process.exit();
});