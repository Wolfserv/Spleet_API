const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./src/database/db');
const userRoute = require('./src/database/data.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/user', userRoute);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});
