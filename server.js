var http = require('http');

const server = http.createServer(function (req,res)  {
  // HTTP server response- 200 indicates a success
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end('Hello, World!');
});

server.listen(8080); // listening on port 8080
