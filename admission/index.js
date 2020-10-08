var express = require("express");
var AdmissionService = require("./admission.service");
var path = require('path');


var router = express.Router();
var multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      console.log(__dirname)
      var filepath = path.resolve(__dirname + '/../client/uploads')
      console.log("file path is", filepath);
      cb(null, filepath)
  },
  filename: function (req, file, cb) {
      console.log("filename for original file is", this.filename, file)
      cb(null, "myfile" + Date.now() + file.originalname)
  }
})

var upload = multer({ storage: storage })

router.post('/upload', upload.single('profilepic'), function (req, res) {
  console.log("req", req.file)
  res.send({
      message: "your file is uploaded with this filename" + req.file.filename,
      filename: req.file.filename
  })

})


//<<<<<<<<<<<uploading multiple image files>>>>>>>>>>>>
router.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  console.log("req", req.file)
  res.send({
      message: "your file is uploaded with this filename" + req.files[0].filename + " and " + req.files[1].filename,
      filename: req.files
  })
})

// var us= require("../user/user.service")

router.post("/addAdmissionFormDetails", function (req, res) {
  if (req.body.email) {
    console.log("req body", req.body);
    AdmissionService.addAllAdmissionFormDetails(req.body)
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
});



router.get("/all", function (req, res) {
  AdmissionService.findAll()
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


module.exports = router;