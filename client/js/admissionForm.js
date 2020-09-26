
var loadFile = function(event) {
	var photo = document.getElementById('photo');
    photo.src = URL.createObjectURL(event.target.files[0]);
};
var uploadSignature = function(event) {
    var signature = document.getElementById('signature');
    signature.src = URL.createObjectURL(event.target.files[0]);
};

var uploadTwelth = function(event) {
	var twelth = document.getElementById('twelth');
    twelth.src = URL.createObjectURL(event.target.files[0]);
};
var uploadTenth = function(event) {
    var tenth = document.getElementById('tenth');
    tenth.src = URL.createObjectURL(event.target.files[0]);
};
function validateEmail(emailField){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField.value) == false) 
    {
        alert('Invalid Email Address');
        return false;
    }

    return true;

}

function validate(form) {
    for (var i = 0; i <= 10; i++) {
        if (document.forms.elements[i].value == "") {
            var err = "Please enter " + document.forms.elements[i].name;
            // document.getElementById('errorname').innerHTML = err;
            document.forms.elements[i].focus();
            alert(err);

            return (false);
        }
        if (document.forms.elements[5].value != "") {
            pass = document.forms.elements[5].value.indexOf('@', 0);
            pass1 = document.forms.elements[5].value.indexOf('.', 0);
            if ((pass == -1) || (pass1 == -1)) {
                alert("Not a valid Email address");
                document.forms.elements[5].focus();
                return (false);
            }
        }
    
    }
    return (true);


}

function validateEducation(form) {
    for (var i = 0; i <= 1; i++) {
        if (document.form1.elements[i].value == "") {
            var err = "Please enter " + document.form1.elements[i].name;
            document.form1.elements[i].focus();
            alert(err);

            return (false);
        }
    }
    alert("Successfully Submitted!!!!!!");
    return (true);


}