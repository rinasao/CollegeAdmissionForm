var express = require("express");
var UserService = require("./user.service");
var router = express.Router();

// based on what userservice is returning the message the corresponding
// function/action will be called
router.post("/register", function (req, res) {
  if (req.body.email) {
    console.log("req body", req.body);
    UserService.addUser(req.body)
      .on("ERROR", function () {
        res.status(500).send({
          message: "Internal Server Error",
        });
      })
      .on("SUCCESS", function () {
        res.status(200).send({
          message: "User Successfully registered",
        });
      })
      .on("DUPLICATE", function () {
        res.status(200).send({
          message: "User with this email already exists",
        });
      });
  } else {
    res.status(500).send({
      message: "Email is Required",
    });
  }
});

router.post("/login", function (req, res) {
  if (req.body.email && req.body.password) {
    UserService.login(req.body)
      .on("INVALIDLOGIN", function () {
        res.send({
          message: "INVALID LOGIN",
        });
      })
      .on("SUCCESS", function () {
        res.send({
          message: "LOGIN SUCCESS",
        });
      });
  } else {
    res.send({
      message: "Insufficient Details",
    });
  }
});

router.get("/verify/:token", function (req, res) {
  UserService.verifyUser(req.params)
    .on("SUCCESS", function () {
      res.send({
        message: "Verified Success",
      });
    })
    .on("ERROR", function () {
      res.send({
        message: "ERROR OCCURED",
      });
    });
});

router.post("/signup", function (req, res) {
  UserService.addUser(req.body)
    .on("DUPLICATE", function () {
      res.status(200).send({
        message: "USer With this email already exists",
      });
    })
    .on("ERRORHOGYA", function () {
      res.status(500).send({
        message: "Internal Server Error",
      });
    })
    .on("SUCCESS", function () {
      console.log("data saved");
      res.status(200).send({
        message: "User registered Successfully",
      });
    });
});

router.post("/signin", function (req, res) {
  UserService.findUser(req.body)
    .on("ERROR", function () {
      res.status(500).send({
        message: "Internal Server Error",
      });
    })
    .on("FOUND", function () {
      res.status(200).send({
        message: "Login Success",
      });
    })
    .on("NOTFOUND", function () {
      res.status(200).send({
        message: "User name or password is incorrect",
      });
    })
    .on("NOTVERIFIED", function () {
      res.status(200).send({
        message: "You are not a verified user",
      });
    });
});

router.post("/forgot", function (req, res) {
  UserService.sendPassword(req.body)
    .on("ERROR", function () {
      res.status(500).send({
        message: "Internal Server Error",
      });
    })
    .on("SUCCESS", function () {
      res.status(200).send({
        message: "Password Sent at your Email",
      });
    })
    .on("NOTFOUND", function () {
      res.status(200).send({
        message: "Email Not Found",
      });
    });
});

router.post("/resetPassword", function (req, res) {
  UserService.resetPassword(req.body)
    .on("ERROR", function () {
      res.status(500).send({
        message: "Internal Server Error",
      });
    })
    .on("FOUND", function () {
      res.status(200).send({
        message: "Password changed successfully",
      });
    })
    .on("NOTFOUND", function () {
      res.status(200).send({
        message: "Email Not Found",
      });
    });
});

router.get("/all", function (req, res) {
  UserService.findAll()
    .on("ERROR", function () {
      res.status(500).send({
        message: "Internal Server Error",
      });
    })
    .on("SUCCESS", function (data) {
      res.status(200).send({
        message: "USERS FOUND",
        data: data,
      });
    });
});

router.delete("/deleteuser", function (req, res) {
  UserService.deleteuser(req.body)
    .on("ERROR", function () {
      res.status(500).send({
        message: "Internal Server Error",
      });
    })
    .on("SUCCESS", function (data) {
      res.status(200).send({
        message: "USERS DELETED",
        data: data,
      });
    });
});


/*router.post("/addAdmissionFormDetails", function (req, res) {
  if (req.body.email) {
    console.log("req body", req.body);
    UserService.addAllAdmissionFormDetails(req.body)
      .on("ERROR", function () {
        res.status(500).send({
          message: "Internal Server Error",
        });
      })
      .on("SUCCESS", function () {
        res.status(200).send({
          message: "Admission form details added successfully",
        });
      })
      .on("DUPLICATE", function () {
        res.status(200).send({
          message: "User with this email already exists",
        });
      });
  } else {
    res.status(500).send({
      message: "Email is Required",
    });
  }
});*/
// router.get("/getAllAdmissionDetails", function (req, res) {
//   UserService.findAllAdmissionDetails()
//     .on("ERROR", function () {
//       res.status(500).send({
//         message: "Internal Server Error",
//       });
//     })
//     .on("SUCCESS", function (data) {
//       res.status(200).send({
//         message: "USERS FOUND",
//         data: data,
//       });
//     });
// });


module.exports = router;
