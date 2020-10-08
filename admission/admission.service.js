var EventEmitter = require("events").EventEmitter;
var fs = require("fs");
var AdmissionModel = require("./admission.model");
var Mailer = require("../mailer");
// this function's basic role is to accept the data and process that data and store it . It doesn't matter
// for whom it is doing this functionality

// instead of responding it directly we are responding to de callee
exports.addAllAdmissionFormDetails = function (payload) {
  let emitter = new EventEmitter();
  // payload.applicationNumber = Date.now(); // adding a field at server level
  var admissiondata = new AdmissionModel(payload); // it will return the shaped or modeled data
  AdmissionModel.findOne({ email: payload.email }, function (err, admissionfound) {
    if (err) {
      console.log("error...")
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
            console.log("success....")
            // var token = jwt.sign({ email: newadmission.email }, "mysecretkey");
            // var verifylink = "http://localhost:9000/user/verify/" + token;
            // console.log("verify link is", verifylink);
            var message = "YOUR APPLICATION FORM IS SUBMITTED SUCCESSFULLY</b>";
            Mailer.sendMail(payload.email, message);
            return emitter.emit("SUCCESS");
          }
        });
      }
    }
  });
  return emitter;
};

exports.findAll = function () {
  var emitter = new EventEmitter();
  AdmissionModel.find({}, function (
    err,
    admissions
  ) {
    if (err) {
      return emitter.emit("ERROR");
    } else {
      return emitter.emit("SUCCESS", admissions);
    }
  });
  return emitter;
};