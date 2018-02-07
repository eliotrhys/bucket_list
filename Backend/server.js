// const express = require('express');
// const parser = require('body-parser');
// const server = express();
// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;
// const cors = require('cors');
//
//
// server.use(parser.json());
// // server.use(express.static('client/build'));
// server.use(parser.urlencoded({extended: true}));
// server.use(cors);
//
// MongoClient.connect('mongodb://localhost:27017', function(err, client){
//   if(err){
//     console.log(err)
//     return;
//   }
//
//   const db = client.db('bucketlist');
//   console.log('connected to db');
//
//   //GET
//
//   server.get('/api/bucketlist', function(req, res){
//     db.collection('countries').find().toArray(function(err, result){
//       if(err){
//         console.log(err);
//         res.status(500);
//         res.send();
//       }
//       res.status(200);
//       res.json(result);
//     })
//   })
//
//   server.listen(9000, function() {
//     console.log('listening on port 9000')
//   });
//
// });

const express = require('express');
const parser = require('body-parser');
const server = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
server.use(cors());

server.use(parser.json());
// server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) {
        console.log(err)
        return
    }

    const db = client.db('bucketlist');

    console.log("Connected to database!");

    //GET ALL

    server.get('/api/bucketlist', function (req, res) {
        db.collection('countries').find().toArray(function (err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send();
            }

            res.status(200)
            res.json(result);
            console.log("Database retrieved");
        });
    });

    server.post('/api/bucketlist', function (req, res) {
        db.collection('countries').save(req.body, function (err, result) {
            if(err){
                console.log(err);
                res.status(500);
                res.send();
            }
            res.status(201);
            res.json(result.ops[0]);

            console.log("Object Saved")
        })
    })

    server.listen(5000, function () {
        console.log('Listening on port 3000');
    });

});
