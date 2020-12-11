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


const uri = "mongodb://localhost:27017/notesdb"
mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true }, (err) => {
    console.log("Database connection status: " + mongoose.connection.readyState);
})


const server = app.listen(8080, () => {
    console.log('listening on port %s...', server.address().port);
  });
 