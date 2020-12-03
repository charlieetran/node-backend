const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')

var app = express();
app.use(cors())

// file system helper
const fs = require('fs');

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs);

const url = 'mongodb://localhost:27017'
mongoose.connect(url, function(err, db) {
    console.log("Databse connection established");
    db.close();
})

const server = app.listen(8080, () => {
    console.log('listening on port %s...', server.address().port);
  });