// var loadFile = function (event) {
//   var photo = document.getElementById("photo");
//   photo.src = URL.createObjectURL(event.target.files[0]);
//   console.log("src ",photo.src, "event", event);
// };
var imageFile;
function loadFile(event) {
  console.log(".............", event.target.files);
  let myform = new FormData();
  myform.append("profilepic", event.target.files[0]);
  console.log("form data ready", myform);
  fetch("http://localhost:9000/admission/upload", {



  //   myform.append("photos", event.target.files);
  // console.log("form data ready", myform);
  // fetch("http://localhost:9000/admission/photos/upload", {
    method: "post",
    headers: {
      Accept: "application/json",
    },
    body: myform,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(">>>>>>>>", data);
      document.getElementById("profileimage").src =
        "http://localhost:9000/uploads/" + data.filename;
    });
   imageFile = data.filename;
}

var uploadSignature = function (event) {
  var signature = document.getElementById("signature");
  signature.src = URL.createObjectURL(event.target.files[0]);
};

var uploadTwelth = function (event) {
  var twelth = document.getElementById("twelth");
  twelth.src = URL.createObjectURL(event.target.files[0]);
};
var uploadTenth = function (event) {
  var tenth = document.getElementById("tenth");
  tenth.src = URL.createObjectURL(event.target.files[0]);
};

/*
function validateEmail(emailField){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField.value) == false) 
    {
        alert('Invalid Email Address');
        return false;
    }
    return true;
}*/

function validate(form) {
  event.preventDefault();

  let courses = document.getElementById("courses").value;
  let fName = document.getElementById("fName").value;
  let fatherName = document.getElementById("fatherName").value;
  let motherName = document.getElementById("motherName").value;
  let mobileNumber = document.getElementById("mobileNumber").value;
  let fatherMobileNumber = document.getElementById("fatherMobileNumber").value;
  let email = document.getElementById("email").value;
  let dob = document.getElementById("dob").value;
  let aadharCardNo = document.getElementById("aadharCardNo").value;
  let birthPlace = document.getElementById("birthPlace").value;
  let gender = document.getElementById("gender").value;
  let religion = document.getElementById("religion").value;
  let category = document.getElementById("category").value;
  let cast = document.getElementById("cast").value;
  let motherTongue = document.getElementById("motherTongue").value;
  let address = document.getElementById("address").value;
  let slct1 = document.getElementById("slct1").value;
  let slct2 = document.getElementById("slct2").value;
  let zipCode = document.getElementById("zipCode").value;



  var admissionForm1Object = {
    courses:courses,
    fName: fName,
    fatherName: fatherName,
    motherName: motherName,
    mobileNumber: mobileNumber,
    fatherMobileNumber: fatherMobileNumber,
    email: email,
    dob: dob,
    aadharCardNo: aadharCardNo,
    birthPlace: birthPlace,
    gender: gender,
    religion: religion,
    category: category,
    cast: cast,
    motherTongue: motherTongue,
    address: address,
    slct1: slct1,
    slct2: slct2,
    zipCode: zipCode,
  };

  for (var i = 0; i <= 10; i++) {
    if (document.forms.elements[i].value == "") {
      var err = "Please enter " + document.forms.elements[i].name;
      // document.getElementById('errorname').innerHTML = err;
      document.forms.elements[i].focus();
      alert(err);

      return false;
    }
    if (document.forms.elements[5].value != "") {
      var x = document.forms.elements[5].value;
      atPos = document.forms.elements[5].value.indexOf("@", 0);
      dotPos = document.forms.elements[5].value.indexOf(".", 0);
      if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= x.length) {
        alert("Please enter a valid email address.");
        // errors["Invalid Email"] = "Kindly enter a valid email address";
        return false;
      }
    }
  }

  let form1List = JSON.parse(localStorage.getItem("form1List") || "[]");
  form1List.push(admissionForm1Object);
  console.log(form1List);
  localStorage.setItem("form1List", JSON.stringify(form1List));
  window.location = "http://localhost:9000/admission-form2.html";

  return true;
}

function validateEducation(form) {
  event.preventDefault();
  let board1 = document.getElementById("sscboard").value;
  let sscspec = document.getElementById("sscsub").value;
  let sscpass = document.getElementById("sscpass").value;
  let sscmarks = document.getElementById("sscmarks").value;
  let sscper = document.getElementById("sscper").value;
  let board2 = document.getElementById("board2").value;
  let interspec = document.getElementById("intersub").value;
  let interpass = document.getElementById("interpass").value;
  let intermarks = document.getElementById("intermarks").value;
  let interper = document.getElementById("interper").value;
  let transactionId = document.getElementById("transactionId").value;

  let profilepic = imageFile;
  let signaturepic = "signature";
  let intermarksheet = "intermarksheet";
  let sscmarksheet = "sscmarksheet";



  for (var i = 0; i <= 7; i++) {
    if (document.form1.elements[i].value == "") {
      var err = "Please enter " + document.form1.elements[i].name;
      document.form1.elements[i].focus();
      alert(err);

      return false;
    }
  }

  var admissionForm2Object = {
    sscBoard: board1,
    sscSubject: sscspec,
    sscPassout: sscpass,
    sscMarks: sscmarks,
    sscPercentage: sscper,
    interBoard: board2,
    interSubject: interspec,
    interPassout: interpass,
    interMarks: intermarks,
    interPercentage: interper,
    // photo: photo.src,
    // signature: signature.src,
    // twelth: twelth.src,
    // tenth: tenth.src,
    transactionId: transactionId,
    profilePic:profilepic,
    signaturePic:signaturepic,
    interMarksheet:intermarksheet,
    sscMarksheet:sscmarksheet,
  };

  console.log(admissionForm2Object);
  // localStorage.removeItem("form2List");

  let form2List = JSON.parse(localStorage.getItem("form1List") || "[]");
  form2List.push(admissionForm2Object);
  console.log(form2List);
  localStorage.setItem("form2List", JSON.stringify(form2List));
  var admissionFormAllDetails = {
    ...form2List[0],
    ...form2List[1],
  };

  console.log("admissionFormAllDetails", admissionFormAllDetails);

  fetch("http://localhost:9000/admission/addAdmissionFormDetails", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(admissionFormAllDetails),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(">>>>>>>>>>", data);
      alert(data.message);
      localStorage.removeItem("form2List");
      localStorage.removeItem("form1List");

      // if(data.message == "User registered Successfully"){
      // alert(data.message);
      //   window.location="http://localhost:9000/signin.html"
      // }
      // else{
      // alert(data.message);
      //   return false;
      // }
    });

  return true;
}
