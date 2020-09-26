var EventEmitter = require('events').EventEmitter
var fs = require('fs')
// this function's basic role is to accept the data and process that data and store it . It doesn't matter
// for whom it is doing this functionality

// instead of responding it directly we are responding to de callee 
exports.addUser = function(payload){

    var emitter = new EventEmitter()

    // do the the thinkinh part which is processing in terms of coding
    var userdata = JSON.stringify(payload)+"\n"
    var duplicate = false
          if(fs.existsSync('users.txt')){
           fs.readFile('users.txt', function(err,data){
               if(err){
                   console.log("Error in registration", err)
                   emitter.emit('ERROR')
               }
               else{
                   var users = data.toString().split("\n")
                   users.pop()
                   console.log("....... users", users)
                   for(var i = 0 ; i<users.length ; i++){
                       var user = JSON.parse(users[i])
                       if(user.email==payload.email){
                           duplicate = true
                           break
                       }
                   }
                   if(duplicate){
                    emitter.emit('DUPLICATE')
                   }
                   else{
                       fs.appendFile('users.txt',userdata, function(err){
                           if(err){
                             emitter.emit('ERROR') 
                           }
                           else{
                             emitter.emit('SUCCESS')
                           }
                       })
                   }
               }   
             })
          }
          else{
           fs.appendFile('users.txt',userdata, function(err){
               if(err){
                emitter.emit('ERROR') 
                  
               }
               else{
                emitter.emit('SUCCESS')   
               }
           })
          }

    return emitter   // returning the emitter on which i will emit some event 
}