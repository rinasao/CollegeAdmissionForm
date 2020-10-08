var Mongoose = require('mongoose')


var Schema = Mongoose.Schema

var StudentRegistrationSchema = new Schema({
    userName:{type:String,required:true},
    email:{type:String, required:true , unique:true},
    password:{type:String, required:true},
    // confirmPassword:{type:String, required:true},
    typeGender:{type:String},
    phoneNumber:{type:Number},
    id:{type:Number, unique:true , required:true},
    verified:{type:Boolean,default:false}
})


var UserModel = Mongoose.model('studentRegistration',StudentRegistrationSchema)



// Usermodel is mapped with users collection in the database everytime we need to do anything
// in usrers table or collection we can bring usermodel and it will do our task

// usermodel will ensure the schema of USER schema mentiioned from line 6 

// for example if some one is not senidng the email it will not allow 
//to save anything in users collection due to required is true

module.exports = UserModel

