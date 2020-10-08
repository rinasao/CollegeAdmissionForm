var EventEmitter = require("events").EventEmitter;
var fs = require("fs");
var UserModel = require("./user.model");
var Mailer = require("../mailer.js");
var jwt = require("jsonwebtoken");

var AdmissionModel = require("../admission/admission.model");

// this function's basic role is to accept the data and process that data and store it . It doesn't matter
// for whom it is doing this functionality

// instead of responding it directly we are responding to de callee

exports.verifyUser = function (payload) {
  // {token:"sjdsdjdnsjfndsjfnjdsn"}
  var emitter = new EventEmitter();
  var data = jwt.decode(payload.token); // {email:"some users' email"}
  console.log(">>>>>>>>>>> data in verify", data);
  UserModel.updateOne(
    { email: data.email },
    { $set: { verified: true } },
    function (err, updateduser) {
      if (err) {
        console.log(".......error in updating the user", err);
        return emitter.emit("ERROR");
      } else {
        console.log("User is verified", updateduser);
        if (updateduser.nModified == 1) {
          return emitter.emit("SUCCESS");
        } else {
          return emitter.emit("ERROR");
        }
      }
    }
  );

  return emitter;
};

// exports.create = function(data){
// data.id = Date.now()
// var userdata = new UserModel(data)
// // in line 139 we are handing over the raw data to UserModel. UserModel is
// // checking that data with the schema explained if data doesn't matches with the schema
// // it throws different different errors other wise it reutrn the modeled data
// userdata.save(function(err,newuser){ // it will be saved in users ? beacuase Usermodel is mapped to users
// if(err){
// console.log("some error occured in adding user to database", err)
// }
// else{
// console.log("user created in database",newuser)

// }
// })
// }

exports.findUser = function (payload) {
  var emitter = new EventEmitter();
  UserModel.findOne(
    // { email: payload.email, password: payload.password, verified:true },
    { email: payload.email, password: payload.password },

    function (err, user) {
      if (err) {
        console.log("error in finding user ", err);
        return emitter.emit("ERROR");
      } else {


        if (user) {

          if(user.verified){
            console.log("Finding user operation done", user);
          return emitter.emit("FOUND");
          }else{
          return emitter.emit("NOTVERIFIED");

          }

          // console.log("Finding user operation done", user);
          // return emitter.emit("FOUND");
        
        } else {
          return emitter.emit("NOTFOUND");
        }




        // if (user) {
        //   console.log("Finding user operation done", user);
        //   return emitter.emit("FOUND");
        // } else {
        //   return emitter.emit("NOTFOUND");
        // }
      }
    }
  );

  return emitter;
};

exports.addUser = function (payload) {
  // ur task is to accept payload and do ur respective
  // task i.e sving the received data into users collection in data
  // it doesnot matter who is asking u to do the task
  let emitter = new EventEmitter();
  payload.id = Date.now(); // adding a field at server level
  var userdata = new UserModel(payload); // it will return the shaped or modeled data
  UserModel.findOne({ email: payload.email }, function (err, userfound) {
    if (err) {
      return emitter.emit("ERRORHOGAYA");
    } else {
      if (userfound) {
        return emitter.emit("DUPLICATE");
      } else {
        userdata.save(function (err, newuser) {
          console.log("..........", err, newuser);
          if (err) {
            return emitter.emit("ERRORHOGAYA");
          } else {
            var token = jwt.sign({ email: newuser.email }, "mysecretkey");
            var verifylink = "http://localhost:9000/user/verify/" + token;
            console.log("verify link is", verifylink);
            var message = "click here to verify \n" + verifylink;
            Mailer.sendMail(payload.email, message);
            return emitter.emit("SUCCESS");
          }
        });
      }
    }
  });
  // userdata.save(function(err,newuser){
  // if(err){
  // console.log("error in adding to database", err)
  // if(err.code==11000){
  // return emitter.emit("ALREADYEXISTS")
  // }
  // else{
  // return emitter.emit('ERRORHOGYA')
  // }

  // }
  // else{
  // return emitter.emit('SUCCESS')
  // }
  // })

  return emitter;
};

exports.findAll = function () {
  var emitter = new EventEmitter();
  UserModel.find({}, function (
    err,
    users
  ) {
    if (err) {
      return emitter.emit("ERROR");
    } else {
      return emitter.emit("SUCCESS", users);
    }
  });
  return emitter;
};

exports.sendPassword = function (payload) {
  var emitter = new EventEmitter();
  UserModel.findOne({ email: payload.email }, function (err, userfound) {
    if (err) {
      console.log("error")
      return emitter.emit("ERROR");
    } else {
      if (userfound) {
        Mailer.sendMail(
          userfound.email,
          "Your password is --- " + " " + userfound.password
        );
        console.log("success")
        return emitter.emit("SUCCESS");
      } else {
        console.log("not found")
        return emitter.emit("NOTFOUND");
      }
    }
  });
  return emitter;
};

/*exports.forgotPassword = function (payload) {
  var emitter = new EventEmitter();
  UserModel.findOne({ email: payload.email, password:payload.password }, function (err, userfound) {
    if (err) {
      console.log("error")
      return emitter.emit("ERROR");
    } else {
      if (userfound) {
        UserModel.updateOne(
          { email: payload.email, password:payload.password },
          { $set: { password: payload.newPassword } },
          function (err, updateduser) {
            if (err) {
              console.log(".......error in updating the user", err);
              return emitter.emit("ERROR");
            } else {
              console.log("Password is successfully changed", updateduser);
              if (updateduser.nModified == 1) {
                return emitter.emit("SUCCESS");
              } else {
                return emitter.emit("ERROR");
              }
            }
          }
        );
        console.log("success")
        return emitter.emit("SUCCESS");
      } else {
        console.log("not found")
        return emitter.emit("NOTFOUND");
      }
    }
  });
  return emitter;
};
*/


exports.resetPassword = function (payload) {
  var emitter = new EventEmitter();
  UserModel.updateOne(
    { email: payload.email, password:payload.password },
    { $set: { password: payload.newPassword } },
    function (err, updateduser) {
      if (err) {
        console.log(".......error in updating the user", err);
        return emitter.emit("ERROR");
      } else {
        console.log("Password is successfully changed", updateduser);
        if (updateduser.nModified == 1) {
          return emitter.emit("FOUND");
        } else {
          return emitter.emit("NOTFOUND");
        }
      }
    }
  );
  return emitter;
};



exports.deleteuser = function(payload){
  var emitter = new EventEmitter()
  var usermail = payload.email
  UserModel.deleteOne({email:usermail}, function(err,userfound){
  if(err){
      console.log("Error occured", err)
      return emitter.emit('ERROR')
  }
  else{
  if(userfound){
      //Mailer.sendMail(userfound.,"user is deleted from the record ", userfound.email)
      console.log("user is deleted success from the list",usermail)
      return emitter.emit('SUCCESS') 
  }
  else{
      console.log("user is Not found from the list",usermail)
      return emitter.emit("NOTFOUND")
  }
  }
  })
  return emitter
}





/*exports.addAllAdmissionFormDetails = function (payload) {
  let emitter = new EventEmitter();
  payload.applicationNumber = Date.now(); // adding a field at server level
  var admissiondata = new AdmissionModel(payload); // it will return the shaped or modeled data
  AdmissionModel.findOne({ email: payload.email }, function (err, admissionfound) {
    if (err) {
      return emitter.emit("ERRORHOGAYA");
    } else {
      if (admissionfound) {
        return emitter.emit("DUPLICATE");
      } else {
        admissiondata.save(function (err, newadmission) {
          console.log("..........", err, newadmission);
          if (err) {
            return emitter.emit("ERRORHOGAYA");
          } else {
            // var token = jwt.sign({ email: newadmission.email }, "mysecretkey");
            // var verifylink = "http://localhost:9000/user/verify/" + token;
            // console.log("verify link is", verifylink);
            var message = "YOUR APPLICATION NUMBER IS \n <b>" + payload.applicationNumber + "</b>";
            Mailer.sendMail(payload.email, message);
            return emitter.emit("SUCCESS");
          }
        });
      }
    }
  });
  return emitter;
};*/
// exports.findAllAdmissionDetails = function () {
//   var emitter = new EventEmitter();
//   UserModel.find({}, function (
//     err,
//     users
//   ) {
//     if (err) {
//       return emitter.emit("ERROR");
//     } else {
//       return emitter.emit("SUCCESS", users);
//     }
//   });
//   return emitter;
// };
