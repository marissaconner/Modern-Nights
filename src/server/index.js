const express = require('express');
const path = require('path');
const app = express();
let http = require('http');
http = http.Server(app);

// const { remoteServer, mushport } = require('../../config.js');
// const io = require('socket.io');
// var server = http.createServer();
// server.listen(3000, 'localhost');
// var socket = io.listen(server);

app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('/public/', express.static(path.join(__dirname, '..', 'public')));
app.use('/lib/', express.static(path.join(__dirname, '..', '..', '..', 'node_modules')));

app.get('*', (req, res) => {
  console.log("Get request recieved")
  res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
 })
