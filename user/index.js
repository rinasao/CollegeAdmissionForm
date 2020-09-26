var express = require('express')
var UserService = require('./user.service')
var router = express.Router()

// based on what userservice is returning the message the corresponding 
// function/action will be called
router.post('/register', function(req,res){
  if(req.body.email){  
  UserService.addUser(req.body)
  .on('ERROR', function(){
      res.status(500).send({
          message:"Internal Server Error"
      })
  })
  .on('SUCCESS', function(){
    res.status(200).send({
        message:"User Successfully registered"
    })
  })
  .on('DUPLICATE', function(){
    res.status(200).send({
        message:"User with this email already exists"
    })
  })
  }
  else{
    res.status(500).send({
        message:"Email is Required"
    })
  }

})

router.post('/admin/adduser', function(){

})







module.exports = router;