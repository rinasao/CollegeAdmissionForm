var Mongoose = require('mongoose')


var Schema = Mongoose.Schema

// id:{type:Number, unique:true , required:true},



    










var applications = new Schema({
    aadharCardNo:{type:String, required:true, unique:true},
    courses:{type:String, required:true},
    specialization:{type:String, required:true},

    ugCourse:{type:String},
    ugUniversity:{type:String},
    ugPercentage:{type:String},
    ugPassout:{type:String},
    ugSpecilaization:{type:String},

    pgCourse:{type:String},
    pgUniversity:{type:String},
    pgPercentage:{type:String},
    pgPassout:{type:String},
    pgSpecilaization:{type:String},

    address:{type:String},
    birthPlace:{type:String},
    cast:{type:String, required:true},
    category:{type:String, required:true},
    dob:{type:String, required:true},
    email:{type:String, required:true},
    fName:{type:String, required:true},
    fatherMobileNumber:{type:String, required:true},
    fatherName:{type:String, required:true},
    gender:{type:String, required:true},

    interBoard:{type:String, required:true},
    interMarks:{type:String, required:true},
    interPassout:{type:String, required:true},
    interPercentage:{type:String, required:true},
    interSubject:{type:String, required:true},
    interMarksheet:{type:String, required:true},
    mobileNumber:{type:String, required:true},
    motherName:{type:String, required:true},
    motherTongue:{type:String},
    profilePic:{type:String},
    signaturePic:{type:String},

    religion:{type:String, required:true},
    slct1:{type:String, required:true},
    slct2:{type:String, required:true},
    sscBoard:{type:String, required:true},
    sscMarks:{type:String, required:true},
    sscPassout:{type:String, required:true},
    sscPercentage:{type:String, required:true},
    sscSubject:{type:String, required:true},
    sscMarksheet:{type:String, required:true},
    zipCode:{type:String, required:true},
    transactionId:{type:Number},
})


var AdmissionModel = Mongoose.model('applications',applications)


module.exports = AdmissionModel