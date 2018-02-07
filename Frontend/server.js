const express = require('express');
const server = express();
server.use(express.static('build'));




server.listen(3000, function(){
  console.log("I said Ive been to the port 3000.");
});
