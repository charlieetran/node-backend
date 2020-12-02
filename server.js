const express = require('express');
const bodyParser = require('body-parser');

var app = express();

// file system helper
const fs = require('fs');

const server = app.listen(8080, () => {
    console.log('listening on port %s...', server.address().port);
  });