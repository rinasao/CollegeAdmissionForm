const express = require("express");
var bodyparser = require('body-parser')
const Port = process.env.Port || 9000;
const server = express();

server.use(bodyparser.json())
server.use(express.static(__dirname + '/client'))
server.use(require('./routes'))
server.get('/', function(req, res){
    console.log("base route");
    res.sendFile(__dirname+'/client/home.html')
})

server.listen(Port, function () {
    console.log("Server is running at...", Port);
  });
