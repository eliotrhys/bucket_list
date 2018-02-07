const express = require('express');
const parser = require('body-parser');
const server = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');


server.use(parser.json());
// server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));
server.use(cors);

MongoClient.connect('mongodb://localhost:27017', function(err, client){
  if(err){
    console.log(err)
    return;
  }

  const db = client.db('bucketlist');
  console.log('connected to db');

  server.listen(5000, function() {
    console.log('listening on port 5000')
  })

})
