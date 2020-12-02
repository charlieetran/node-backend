const express = require('express');

var app = express();

const server = app.listen(8080, () => {
    console.log('listening on port %s...', server.address().port);
  });