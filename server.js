// const http = require('http'); 
// const hostname = '127.0.0.1';
//  const port = 3000; 
// const server = http.createServer((req, res) => { 
// res.statusCode = 200;
// res.setHeader('Content-Type', 'text/html');
// res.end('<h1>Hello, World!</h1>');
// }); 
// server.listen(port, hostname, () => { 
// console.log(`Server running at http://${hostname}:${port}/`); });

const express = require('express');
const bodyParser = require('body-parser');
const index = require('./src/index');

const app = express();
app.use(bodyParser.json());

app.use('/', index);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
