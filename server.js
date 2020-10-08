const express = require("express");
var bodyparser = require('body-parser')
const Port = process.env.Port || 9000;

var Mongoose = require('mongoose')
var dburl = "mongodb://testuser:test12345@ds045704.mlab.com:45704/hcldatabase"
// var localdburl = "mongodb://localhost:27017/nameofyourdatabase"
Mongoose.connect(dburl, function(err,client){
    if(err){
        console.log("Error in connecting to db")
    }
    else{
    console.log(">>>>>>>", "connected to database")
    }
})

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
