const express = require('express');
const path = require('path');
const { Client } = require('pg');
const app = express();
let http = require('http');
http = http.Server(app);
const { user, host, database, port, password } = require('../../config.js');

const client = new Client({
  user,
  host,
  database,
  password,
  port
});

client.connect();

app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('/public/', express.static(path.join(__dirname, '..', 'public')));
app.use('/lib/', express.static(path.join(__dirname, '..', '..', '..', 'node_modules')));

app.get('*', (req, res) => {
  console.log("Get request recieved")
  res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

app.listen(3000, () => {
  console.log(`Express server listening on port 3000`);
 })
