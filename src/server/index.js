const express = require('express');
const path = require('path');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const { user, host, database, port, password } = require('./config.js');

const app = express();
const helpfileCtrl = require('./controllers/helpfilecontroller.js');

let http = require('http');
http = http.Server(app);

const client = new Client({
  user,
  host,
  database,
  password,
  port
});

client.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('/public/', express.static(path.join(__dirname, '..', 'public')));

app.get('/api/helpfiles/', (req, res) => {
  helpfileCtrl.getHelpfiles( client, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
});

app.get('/api/newsfiles/', (req, res) => {
  helpfileCtrl.getRulefiles( client, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
});


app.get('/api/helpfiles/search/', (req, res) => {
  helpfileCtrl.search( client, req.query.search, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
});

app.get('/api/helpfiles/buckets/', (req, res) => {
  console.log("Buckets");
  helpfileCtrl.getBuckets( client, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
});

app.get('*', (req, res) => {
  console.log("Get request recieved")
  res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

app.listen(3000, () => {
  console.log(`Express server listening on port 3000`);
 })
